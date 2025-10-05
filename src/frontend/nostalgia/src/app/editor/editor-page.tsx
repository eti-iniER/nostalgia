import { Editor, HotkeyLegend, NavigationBar } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { MIN_FRAME_COUNT } from "@/constants/editor";
import { useEditorContext } from "@/contexts/editor";
import { EditorPageLayout } from "@/layouts";
import { useHotkeys } from "react-hotkeys-hook";

export const EditorPage = () => {
  const editor = useEditorContext();

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
    <EditorPageLayout
      frameKey={editor.currentFrameIndex}
      className="relative grid w-full flex-1 grid-cols-6 flex-col items-center justify-center pb-24 md:pb-8"
      blurAmount={10}
      transitionDuration={0.35}
    >
      <div className="col-span-6 mx-4 flex flex-col items-center gap-4 md:col-span-4 md:col-start-2 md:mx-0">
        <h3 className="font-beanie max-w-md text-center text-2xl font-semibold text-rose-500 md:text-3xl">
          {editor.currentFrame.prompt}
        </h3>
        <Editor />
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row">
          {editor.currentFrameIndex === editor.frames.length - 1 && (
            <Button
              variant="brand"
              className="font-comic-relief w-full rounded-full px-8 py-6 !text-lg md:w-auto"
            >
              Continue
            </Button>
          )}
          {editor.currentFrameIndex >= MIN_FRAME_COUNT - 1 && (
            <Button
              variant="brand-outline"
              className="font-comic-relief w-full rounded-full px-8 py-6 !text-lg md:w-auto"
            >
              End memory
            </Button>
          )}
        </div>
        <NavigationBar
          className="md:absolute md:bottom-3 md:mx-auto"
          onAddImageFrame={() => {}}
          onDeleteFrame={() => {}}
          onAddTextFrame={() => {}}
        />
        <HotkeyLegend className="absolute right-0 bottom-3 hidden md:flex" />
      </div>
    </EditorPageLayout>
  );
};
