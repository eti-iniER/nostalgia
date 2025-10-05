from core.models import Frame, Memory


def get_memory_summary(memory: Memory) -> str:
    """
    Generate a cohesive summary of all frames in a memory for AI processing.

    Formats each frame with its prompt and content/images in a readable format
    that can be used for context in LLM prompts.
    """
    frames = memory.frames.all().prefetch_related("images")

    if not frames.exists():
        return "No frames in this memory yet."

    summary_parts = []

    for index, frame in enumerate(frames):
        frame_summary = f"--- Frame {index + 1} ---\n"
        frame_summary += f"Q: {frame.prompt}\n"

        if frame.type == "text":
            content = frame.content if frame.content else "[No response provided]"
            frame_summary += f"A: {content}\n"
        elif frame.type == "image":
            images = frame.images.all()
            if images.exists():
                frame_summary += f"A: [User provided {images.count()} image(s)"

                # Collect alt text descriptions
                descriptions = [
                    img.alt_text
                    for img in images
                    if img.alt_text and img.alt_text.strip()
                ]

                if descriptions:
                    frame_summary += f" - {', '.join(descriptions)}"

                frame_summary += "]\n"
            else:
                frame_summary += "A: [User provided images]\n"

        summary_parts.append(frame_summary)

    return "\n".join(summary_parts)


def create_new_frame(memory: Memory) -> Frame:
    """
    Create a new frame with an AI-generated prompt based on the memory's history.

    Uses the LLM to analyze the conversation so far and generate a thoughtful,
    empathetic follow-up question that encourages deeper exploration.

    Args:
        memory: The Memory object to create a new frame for.

    Returns:
        A newly created Frame with an AI-generated prompt.
    """
    from core.enums import FrameType
    from core.services.llm.client import LLMClient

    # Get the summary of the memory so far
    summary = get_memory_summary(memory)

    # Initialize the LLM client
    llm_client = LLMClient()

    # Generate a new prompt based on the conversation history
    new_prompt = llm_client.generate_frame_prompt(summary)

    # Create and save the new frame
    # Frames are automatically ordered by id (auto-incrementing primary key)
    new_frame = Frame.objects.create(
        memory=memory,
        type=FrameType.TEXT,  # Default to text type
        prompt=new_prompt,
        content="",  # Empty content, waiting for user response
    )

    return new_frame
