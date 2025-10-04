import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface GoToFrameDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentFrameIndex: number;
  limit: number;
  onSelect: (frame: number) => void;
}

export const GoToFrameDialog: React.FC<GoToFrameDialogProps> = ({
  isOpen,
  onOpenChange,
  limit,
  onSelect,
  currentFrameIndex,
}) => {
  const formSchema = z.object({
    frame: z.int().min(1).max(limit, `Enter a frame between 1 and ${limit}`),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      frame: currentFrameIndex + 1,
    },
  });

  const onSubmit = (data: FormValues) => {
    onSelect(data.frame);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-sm">
        <DialogHeader>
          <DialogTitle>Go to...</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="frame"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={`Enter frame number (1 - ${limit})`}
                      autoFocus
                      {...field}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        if (!isNaN(value)) {
                          field.onChange(value);
                        } else {
                          field.onChange(currentFrameIndex);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Go</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
