import { FrameCounter } from "@/components/editor/frame-counter";
import { GoToFrameDialog } from "@/components/editor/go-to-frame-dialog";
import { useEditorContext } from "@/contexts/editor";
import { useModal } from "@/hooks/use-modal";

export const Editor = () => {
  const editor = useEditorContext();
  const goToFrameDialog = useModal({ hash: "goto" });

  const handleGoToFrame = (frame: number) => {
    console.log("Go to frame:", frame);
  };

  return (
    <div className="relative flex w-full flex-1 flex-col">
      <GoToFrameDialog
        currentFrameIndex={editor.currentFrameIndex}
        isOpen={goToFrameDialog.isOpen}
        onOpenChange={goToFrameDialog.toggle}
        limit={editor.totalFrameCount}
        onSelect={handleGoToFrame}
      />
      <FrameCounter
        currentFrameIndex={editor.currentFrameIndex}
        totalFrameCount={editor.totalFrameCount}
        onClick={goToFrameDialog.open}
      />
    </div>
  );
};
