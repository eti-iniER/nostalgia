import { useEditorContext } from "@/contexts/editor/use-editor-context";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Image, Trash2, Type } from "lucide-react";

interface NavigationBarProps {
  onAddImageFrame: () => void;
  onAddTextFrame: () => void;
  onDeleteFrame: () => void;
  className?: string;
}

export const NavigationBar = ({
  onAddImageFrame,
  onAddTextFrame,
  onDeleteFrame,
  className,
}: NavigationBarProps) => {
  const { currentFrameIndex, totalFrameCount, nextFrame, previousFrame } =
    useEditorContext();
  return (
    <div
      className={cn(
        "font-francisco fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:bottom-6 md:left-auto md:-translate-x-0",
        "flex items-center gap-0.5 px-2 py-2 md:gap-1 md:px-3 md:py-2.5",
        "rounded-full border border-neutral-200 bg-white/95 backdrop-blur-sm md:border-transparent",
        "text-[0.95em] shadow-lg shadow-neutral-300/50 duration-150 select-none md:text-[1.2em] md:shadow-sm",
        "hover:border-neutral-200 hover:shadow-xs",
        "animate-in slide-in-from-bottom-5",
        "max-w-[95vw]",
        className,
      )}
    >
      {/* Navigation Controls */}
      <div className="flex items-center gap-0">
        <button
          onClick={previousFrame}
          disabled={currentFrameIndex <= 0}
          className={cn(
            "rounded-md p-2 duration-150 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent md:p-1.5",
            "text-neutral-500 hover:text-neutral-700",
          )}
          title="Previous frame"
        >
          <ChevronLeft className="size-5 md:size-5" />
        </button>

        <div className="px-1.5 text-neutral-400 md:px-2">
          <span className="font-semibold text-neutral-600">
            {currentFrameIndex + 1}
          </span>
          {" / "}
          <span className="font-semibold text-neutral-600">
            {totalFrameCount}
          </span>
        </div>

        <button
          onClick={nextFrame}
          disabled={currentFrameIndex >= totalFrameCount - 1}
          className={cn(
            "rounded-md p-2 duration-150 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent md:p-1.5",
            "text-neutral-500 hover:text-neutral-700",
          )}
          title="Next frame"
        >
          <ChevronRight className="size-5 md:size-5" />
        </button>
      </div>

      {/* Divider */}
      <div className="mx-1 h-6 w-px bg-neutral-200 md:mx-1.5" />

      {/* Add Frame Controls */}
      <div className="flex items-center gap-0">
        <button
          onClick={onAddImageFrame}
          className={cn(
            "rounded-md p-2 duration-150 hover:bg-neutral-100 md:p-1.5",
            "text-neutral-500 hover:text-neutral-700",
          )}
          title="Add image frame"
        >
          <Image className="size-5 md:size-5" />
        </button>

        <button
          onClick={onAddTextFrame}
          className={cn(
            "rounded-md p-2 duration-150 hover:bg-neutral-100 md:p-1.5",
            "text-neutral-500 hover:text-neutral-700",
          )}
          title="Add text frame"
        >
          <Type className="size-5 md:size-5" />
        </button>
      </div>

      {/* Divider */}
      <div className="mx-1 h-6 w-px bg-neutral-200 md:mx-1.5" />

      {/* Delete Control */}
      <button
        onClick={onDeleteFrame}
        disabled={totalFrameCount <= 1}
        className={cn(
          "rounded-md p-2 duration-150 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent md:p-1.5",
          "text-neutral-500 hover:text-red-600",
        )}
        title="Delete current frame"
      >
        <Trash2 className="size-5 md:size-5" />
      </button>
    </div>
  );
};
