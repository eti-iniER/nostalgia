from core.services.llm.prompts import FRAME_GENERATION_PROMPT
from django.conf import settings
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI


class LLMClient:
    """
    A client for interacting with a LangChain ReAct agent.

    This class sets up a conversational agent that can use tools to answer
    questions. It uses a ReAct-style prompt and manages conversation history.
    """

    def __init__(self):
        """
        Initializes the LLM, memory, and the agent executor.
        """
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )

        self.llm = ChatOpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_API_URL,
            model=settings.MODEL_NAME,
            temperature=0.5,
        )

        agent = create_tool_calling_agent(llm=self.llm, prompt=FRAME_GENERATION_PROMPT)

        self.agent_executor = AgentExecutor(
            agent=agent,
            memory=self.memory,
            verbose=False,
            handle_parsing_errors=True,
        )

    def ask(self, question: str) -> str:
        """
        Sends a question to the agent and returns the final output.

        Args:
            question: The user's input string.

        Returns:
            The agent's final answer as a string.
        """
        result = self.agent_executor.invoke({"input": question})

        output = result["output"]
        return output.strip().strip("```").strip()

    def generate_frame_prompt(self, memory_summary: str) -> str:
        """
        Generates a new frame prompt based on the memory summary.

        Args:
            memory_summary: A summary of the conversation/memory so far.

        Returns:
            A warm, empathetic follow-up question or prompt.
        """
        prompt_text = f"""Based on this conversation summary, generate a thoughtful follow-up question or prompt:

{memory_summary}

Generate a single, warm follow-up question that will help the person explore their memories further."""

        result = self.agent_executor.invoke({"input": prompt_text})
        output = result["output"]
        return output.strip().strip("```").strip()
