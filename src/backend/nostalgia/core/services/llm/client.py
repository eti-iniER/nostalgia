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

    async def ask(self, question: str) -> str:
        """
        Sends a question to the agent and returns the final output.

        Args:
            question: The user's input string.

        Returns:
            The agent's final answer as a string.
        """
        result = await self.agent_executor.ainvoke({"input": question})

        output = result["output"]
        return output.strip().strip("```").strip()
