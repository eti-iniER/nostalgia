import { FrameCounter } from "@/components/editor/frame-counter";

export const Editor = () => {
  return (
    <div className="relative flex w-full flex-1 flex-col">
      <FrameCounter
        currentFrameIndex={1}
        totalFrameCount={100}
        onClick={() => {}}
      />
    </div>
  );
};
