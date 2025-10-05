import { useState } from "react";

export const useEditor = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [frames, setFrames] = useState<Frame[]>([
    {
      id: "initial-frame",
      type: "text",
      prompt: "Hi there. What are you feeling nostalgic about today?",
      content: "",
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

  const updateFrame = (index: number, frame: Frame) => {
    setFrames((prevFrames) => {
      const newFrames = [...prevFrames];
      newFrames[index] = frame;
      return newFrames;
    });
  };

  return {
    frames,
    currentFrameIndex,
    addFrame,
    addAndGoToFrame,
    nextFrame,
    previousFrame,
    updateFrame,
    totalFrameCount: frames.length,
    currentFrame: frames[currentFrameIndex] || null,
  };
};
