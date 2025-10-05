import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

const formatFrameForAI = (frame: Frame, index: number): string => {
  let formatted = `--- Frame ${index + 1} ---\n`;
  formatted += `Q: ${frame.prompt}\n`;

  if (frame.type === "text") {
    formatted += `A: ${frame?.content || "[No response provided]"}\n`;
  } else if (frame.type === "image") {
    if (frame.images && frame.images.length > 0) {
      formatted += `A: [User provided ${frame.images.length} image(s)`;
      const descriptions = frame.images
        .map((img) => img.altText)
        .filter((alt) => alt && alt.trim());
      if (descriptions.length > 0) {
        formatted += ` - ${descriptions.join(", ")}`;
      }
      formatted += `]\n`;
    } else {
      formatted += `A: [User provided images]\n`;
    }
  }

  return formatted;
};

export const useEditor = () => {
  const [userId, setUserId] = useLocalStorage("userId", crypto.randomUUID());
  const [activeMemoryId, setActiveMemoryId] = useLocalStorage<string | null>(
    "activeMemoryId",
    null,
  );
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [frames, setFrames] = useState<Frame[]>([
    {
      id: "initial-frame",
      type: "text",
      prompt: "Hi there. What are you feeling nostalgic about today?",
      content: "",
    },
    {
      id: "initial-frame2",
      type: "text",
      prompt: "Can you share more details or a specific memory?",
      content: "",
    },
    {
      id: "initial-frame3",
      type: "image",
      prompt: "Do you have any photos related to this memory?",
      images: [],
    },
  ]);

  const addFrame = (frame: Frame) => {
    setFrames((prevFrames) => [...prevFrames, frame]);
    setCurrentFrameIndex(frames.length);
  };

  const addAndGoToFrame = (frame: Frame) => {
    addFrame(frame);
    setCurrentFrameIndex(frames.length);
  };

  const nextFrame = () => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex(currentFrameIndex + 1);
    }
  };

  const previousFrame = () => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(currentFrameIndex - 1);
    }
  };

  const getSummary = (): string => {
    return frames
      .map((frame, index) => formatFrameForAI(frame, index))
      .join("\n");
  };
  const updateFrame = (index: number, frame: Frame) => {
    setFrames((prevFrames) => {
      const newFrames = [...prevFrames];
      newFrames[index] = frame;
      return newFrames;
    });
  };

  return {
    userId,
    setUserId,
    activeMemoryId,
    setActiveMemoryId,
    frames,
    currentFrameIndex,
    addFrame,
    addAndGoToFrame,
    nextFrame,
    previousFrame,
    updateFrame,
    getSummary,
    totalFrameCount: frames.length,
    currentFrame: frames[currentFrameIndex] || null,
  };
};
