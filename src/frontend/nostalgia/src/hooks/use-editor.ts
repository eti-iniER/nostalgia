import { useHash } from "./use-hash";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

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

const DEFAULT_FRAMES: Frame[] = [
  {
    uuid: crypto.randomUUID(),
    type: "text",
    prompt: "Hi there. What are you feeling nostalgic about today?",
    content: "",
  },
];

export const useEditor = (editorId?: string) => {
  const [userId, setUserId] = useLocalStorage("userId", crypto.randomUUID());
  const [activeMemoryId, setActiveMemoryId] = useLocalStorage<string | null>(
    "activeMemoryId",
    editorId || null,
  );

  // Use localStorage for frames and currentFrameIndex with editorId-specific keys
  const framesKey = editorId
    ? `editor_${editorId}_frames`
    : "editor_default_frames";
  const frameIndexKey = editorId
    ? `editor_${editorId}_frameIndex`
    : "editor_default_frameIndex";

  const [currentFrameIndex, setCurrentFrameIndex] = useLocalStorage(
    frameIndexKey,
    0,
  );
  const [frames, setFrames] = useLocalStorage<Frame[]>(
    framesKey,
    DEFAULT_FRAMES,
  );

  const { hash, setHash } = useHash();

  // Sync hash with current frame index
  useEffect(() => {
    const frameMatch = hash.match(/^frame-(\d+)$/);
    if (frameMatch) {
      const frameIndex = parseInt(frameMatch[1], 10) - 1;
      if (
        frameIndex >= 0 &&
        frameIndex < frames.length &&
        frameIndex !== currentFrameIndex
      ) {
        setCurrentFrameIndex(frameIndex);
      }
    } else if (currentFrameIndex >= 0) {
      // Set initial hash if none exists
      setHash(`frame-${currentFrameIndex + 1}`);
    }
  }, [hash, frames.length, currentFrameIndex, setCurrentFrameIndex, setHash]);

  // Update hash when currentFrameIndex changes (but not from hash change)
  useEffect(() => {
    const expectedHash = `frame-${currentFrameIndex + 1}`;
    const frameMatch = hash.match(/^frame-(\d+)$/);
    const hashFrameIndex = frameMatch ? parseInt(frameMatch[1], 10) - 1 : -1;

    // Only update if the hash doesn't already match
    if (hashFrameIndex !== currentFrameIndex) {
      setHash(expectedHash);
    }
  }, [currentFrameIndex, hash, setHash]);

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
