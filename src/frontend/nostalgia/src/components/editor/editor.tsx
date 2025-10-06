import { Textarea } from "@/components/ui/textarea";
import { useEditorContext } from "@/contexts/editor";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const Editor = () => {
  const { currentFrame, currentFrameIndex, updateFrame } = useEditorContext();
  const form = useForm({
    defaultValues: {
      content: currentFrame?.content || "",
    },
  });

  // Watch for changes and update the editor context
  const content = form.watch("content");

  useEffect(() => {
    if (currentFrame && content !== currentFrame.content) {
      updateFrame(currentFrameIndex, {
        ...currentFrame,
        content,
      });
    }
  }, [content, currentFrame, currentFrameIndex, updateFrame]);

  // Reset form when frame changes
  useEffect(() => {
    form.reset({ content: currentFrame?.content || "" });
  }, [currentFrame?.uuid, currentFrame?.content, form]);

  return (
    <Textarea
      placeholder={
        currentFrameIndex === 0 ? "I remember when..." : "Type here..."
      }
      autoFocus
      className={cn(
        "font-comic-relief flex w-full items-center justify-center border-0 !border-x border-dashed border-neutral-300 p-4 !text-xl text-neutral-600 shadow-none",
        "focus:!ring-0 focus:!outline-none",
        "resize-none rounded-none text-center whitespace-pre-wrap",
        "placeholder:text-neutral-300",
        "max-w-3xl",
      )}
      {...form.register("content")}
    ></Textarea>
  );
};
