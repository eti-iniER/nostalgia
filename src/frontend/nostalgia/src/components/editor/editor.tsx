import { Textarea } from "@/components/ui/textarea";
import { useEditorContext } from "@/contexts/editor";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

export const Editor = () => {
  const { currentFrame, currentFrameIndex } = useEditorContext();
  const form = useForm({
    defaultValues: {
      content: currentFrame?.content || "",
    },
  });

  return (
    <Textarea
      placeholder={
        currentFrameIndex === 0 ? "I remember when..." : "Type here..."
      }
      className={cn(
        "font-comic-relief flex w-full items-center justify-center border-0 !border-x border-dashed border-neutral-300 p-4 !text-xl text-neutral-600 shadow-none",
        "focus:!ring-0 focus:!outline-none",
        "resize-none rounded-none text-center whitespace-pre-wrap",
        "placeholder:text-neutral-300",
      )}
      {...form.register("content")}
    ></Textarea>
  );
};
