import { useState } from "react";

interface UseViewerProps {
  memory: Memory;
  frames: Frame[];
}

export const useViewer = ({
  memory: initialMemory,
  frames: initialFrames,
}: UseViewerProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [memory] = useState<Memory>(initialMemory);
  const [frames] = useState<Frame[]>(initialFrames);

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

  const goToFrame = (index: number) => {
    if (index >= 0 && index < frames.length) {
      setCurrentFrameIndex(index);
    }
  };

  return {
    memory,
    frames,
    currentFrameIndex,
    currentFrame: frames[currentFrameIndex] || null,
    totalFrameCount: frames.length,
    nextFrame,
    previousFrame,
    goToFrame,
    hasNext: currentFrameIndex < frames.length - 1,
    hasPrevious: currentFrameIndex > 0,
  };
};
