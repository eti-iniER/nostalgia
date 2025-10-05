import { useMemory } from "@/api/hooks/memories/use-memory";
import { images } from "@/constants";
import { ViewerProvider } from "@/contexts/viewer";
import { TbX } from "react-icons/tb";
import { Outlet, useParams } from "react-router";

export const ViewerLayout = () => {
  const { memoryUuid } = useParams<{ memoryUuid: string }>();

  // Fetch the memory (frames are now included in the memory object)
  const {
    data: memory,
    isPending,
    isError,
  } = useMemory({
    id: memoryUuid!,
  });

  // Show loading state
  if (isPending) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
        <img
          src={images.heartCircle}
          alt="Loading..."
          className="h-24 w-24 animate-pulse"
        />
        <p className="font-comic-relief text-muted-foreground text-lg">
          Loading your memory
        </p>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
        <div className="relative">
          <img
            src={images.heartCircle}
            alt="Error"
            className="h-24 w-24 opacity-30 grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <TbX size={48} className="text-neutral-500" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-comic-relief text-2xl text-neutral-800">
            Memory not found
          </h2>
          <p className="text-muted-foreground font-comic-relief max-w-md">
            We couldn't find this memory. It may have been deleted or the link
            might be incorrect.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ViewerProvider memory={memory} frames={memory.frames}>
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>
    </ViewerProvider>
  );
};
