import { useState } from "react";

export const useEditor = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [frames, setFrames] = useState<Frame[]>([]);

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

  return {
    frames,
    currentFrameIndex,
    addFrame,
    addAndGoToFrame,
    nextFrame,
    previousFrame,
    totalFrameCount: frames.length,
  };
};
