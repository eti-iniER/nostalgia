import { useCreateMemory } from "@/api/hooks/memories/use-create-memory";
import {
  CreateMemoryDialog,
  type CreateMemoryFormData,
} from "@/components/create-memory-dialog";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useModal } from "@/hooks/use-modal";
import { useHotkeys } from "react-hotkeys-hook";
import { TbPencil } from "react-icons/tb";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const Home = () => {
  const navigate = useNavigate();
  const createMemoryModal = useModal();

  const createMemory = useCreateMemory();

  const handleCreateEditor = () => {
    createMemoryModal.open();
  };

  const handleSubmitMemory = async (data: CreateMemoryFormData) => {
    try {
      createMemory.mutate(data, {
        onSuccess: (data) => {
          toast.success("Memory created successfully!");
          navigate(`/e/${data.uuid}`);
        },
        onSettled: () => {
          createMemoryModal.close();
        },
      });
    } catch (error) {
      console.error("Failed to create memory:", error);
      toast.error("Failed to create memory. Please try again.");
    }
  };

  useHotkeys("ctrl+e", handleCreateEditor);

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="font-beanie animate-[gradient_5s_ease_infinite] bg-gradient-to-r from-rose-400 via-pink-500 to-rose-800 bg-[length:200%_200%] bg-clip-text p-2 text-8xl text-transparent">
            Nostalgia
          </h1>
          <p className="inline-flex items-center text-center text-neutral-400">
            Press
            <KbdGroup className="mx-2">
              <Kbd>Ctrl + E</Kbd>
            </KbdGroup>
            or click
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mx-2"
              onClick={handleCreateEditor}
            >
              <TbPencil />
            </Button>
            to start writing
          </p>
        </div>
      </div>

      <CreateMemoryDialog
        open={createMemoryModal.isOpen}
        onOpenChange={(open) =>
          open ? createMemoryModal.open() : createMemoryModal.close()
        }
        onSubmit={handleSubmitMemory}
        isLoading={createMemory.isPending}
      />
    </>
  );
};
