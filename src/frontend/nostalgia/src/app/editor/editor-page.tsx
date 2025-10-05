import { Editor, NavigationBar } from "@/components/editor";
import { GoToFrameDialog } from "@/components/editor/go-to-frame-dialog";
import { useEditorContext } from "@/contexts/editor";
import { useModal } from "@/hooks/use-modal";

export const EditorPage = () => {
  const editor = useEditorContext();
  const goToFrameDialog = useModal({ hash: "goto" });

  const handleGoToFrame = (frame: number) => {
    console.log("Go to frame:", frame);
  };

  return (
    <div className="relative grid w-full flex-1 grid-cols-6 flex-col items-center justify-center">
      <GoToFrameDialog
        currentFrameIndex={editor.currentFrameIndex}
        isOpen={goToFrameDialog.isOpen}
        onOpenChange={goToFrameDialog.toggle}
        limit={editor.totalFrameCount}
        onSelect={handleGoToFrame}
      />

      <div className="col-span-6 mx-4 flex flex-col items-center gap-4 md:col-span-4 md:col-start-2 md:mx-0">
        <h3 className="font-beanie max-w-md text-center text-3xl font-semibold text-rose-500">
          {editor.currentFrame.prompt}
        </h3>
        <Editor />
        <NavigationBar
          className="absolute bottom-3 mx-auto"
          onAddImageFrame={() => {}}
          onDeleteFrame={() => {}}
          onAddTextFrame={() => {}}
        />
      </div>
    </div>
  );
};
