import { Editor, HotkeyLegend, NavigationBar } from "@/components/editor";
import { GoToFrameDialog } from "@/components/editor/go-to-frame-dialog";
import { useEditorContext } from "@/contexts/editor";
import { useModal } from "@/hooks/use-modal";
import { useHotkeys } from "react-hotkeys-hook";

export const EditorPage = () => {
  const editor = useEditorContext();
  const goToFrameDialog = useModal({ hash: "goto" });

  const handleGoToFrame = (frame: number) => {
    console.log("Go to frame:", frame);
  };

  useHotkeys("left", editor.previousFrame);
  useHotkeys("right", editor.nextFrame);
  useHotkeys("ctrl+right, cmd+right", () =>
    editor.addAndGoToFrame({
      prompt: "Describe the next part of your memory.",
      type: "text",
      id: crypto.randomUUID(),
      content: "",
    }),
  );

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
        <HotkeyLegend className="absolute right-0 bottom-3 hidden md:flex" />
      </div>
    </div>
  );
};
