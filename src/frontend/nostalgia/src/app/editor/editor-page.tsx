import { useUpdateFrame } from "@/api/hooks/frames";
import { useGetNextFrame } from "@/api/hooks/frames/use-get-next-frame";
import { Editor, HotkeyLegend, NavigationBar } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { MIN_FRAME_COUNT } from "@/constants/editor";
import { useEditorContext } from "@/contexts/editor";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

export const EditorPage = () => {
  const editor = useEditorContext();

  const updateFrame = useUpdateFrame({
    memoryUuid: editor.activeMemoryId || "",
    frameUuid: editor.currentFrame?.uuid || "",
  });

  const getNextFrame = useGetNextFrame(editor.activeMemoryId || "");

  const handleContinue = async () => {
    try {
      // Get the current frame's content from the editor context
      const currentContent = editor.currentFrame?.content || "";

      // Update the current frame
      await updateFrame.mutateAsync({
        content: currentContent,
      });

      // Get the next frame from the API
      const newFrame = await getNextFrame.mutateAsync();

      // Add the new frame to the editor and navigate to it
      editor.addAndGoToFrame(newFrame);

      toast.success("Frame saved and new frame created!");
    } catch (error) {
      console.error("Error continuing:", error);
      toast.error("Failed to continue. Please try again.");
    }
  };

  useHotkeys("alt+left", editor.previousFrame, { enableOnFormTags: true });
  useHotkeys("alt+right", editor.nextFrame, { enableOnFormTags: true });

  return (
    <div className="mg:max-w-3xl flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-beanie max-w-md text-center text-2xl font-semibold text-rose-500 md:text-3xl">
          {editor.currentFrame.prompt}
        </h3>
        <Editor />
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row">
          {editor.currentFrameIndex === editor.frames.length - 1 && (
            <Button
              variant="brand"
              className="font-comic-relief w-full rounded-full px-8 py-6 !text-lg md:w-auto"
              onClick={handleContinue}
              disabled={updateFrame.isPending || getNextFrame.isPending}
            >
              {updateFrame.isPending || getNextFrame.isPending
                ? "Saving..."
                : "Continue"}
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
      </div>
      <NavigationBar
        className="md:absolute md:bottom-3 md:mx-auto"
        onAddImageFrame={() => {}}
        onDeleteFrame={() => {}}
        onAddTextFrame={() => {}}
      />
      <HotkeyLegend className="absolute right-0 bottom-3 hidden md:flex" />
    </div>
  );
};
