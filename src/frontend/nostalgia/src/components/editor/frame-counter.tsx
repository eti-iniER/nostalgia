interface FrameCounterProps {
  currentFrameIndex: number;
  totalFrameCount: number;
  onClick: () => void;
}

export const FrameCounter = ({
  currentFrameIndex,
  totalFrameCount,
  onClick,
}: FrameCounterProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-3 py-2 text-sm text-neutral-400 shadow-none shadow-neutral-300/50 backdrop-blur-sm duration-150 select-none hover:border-neutral-200 hover:shadow-xs"
    >
      <span>Frame</span>
      <span className="text-neutral-600">{currentFrameIndex}</span>
      <span>of</span>
      <span className="text-neutral-600">{totalFrameCount}</span>
    </div>
  );
};
