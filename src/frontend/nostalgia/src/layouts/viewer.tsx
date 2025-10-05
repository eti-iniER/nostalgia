import { api } from "@/api";
import { useMemory } from "@/api/hooks/memories/use-memory";
import { ViewerProvider } from "@/contexts/viewer";
import { useQueries } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router";

export const ViewerLayout = () => {
  const { memoryUuid } = useParams<{ memoryUuid: string }>();

  // Fetch the memory
  const { data: memory, isLoading: isLoadingMemory } = useMemory({
    id: memoryUuid!,
  });

  // Fetch all frames using useQueries
  const frameQueries = useQueries({
    queries:
      memory?.frames?.map((frameUuid: string) => ({
        queryKey: ["frame", memoryUuid, frameUuid],
        queryFn: async () => {
          const response = await api.get(
            `memories/${memoryUuid}/frames/${frameUuid}/`,
          );
          return response.json();
        },
        enabled: !!memoryUuid && !!frameUuid,
      })) ?? [],
  });

  const isLoadingFrames = frameQueries.some((query) => query.isLoading);
  const frames = frameQueries
    .map((query) => query.data)
    .filter((frame): frame is Frame => frame !== undefined);

  // Show loading state
  if (isLoadingMemory || isLoadingFrames) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Show error state
  if (!memory) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <p>Memory not found</p>
      </div>
    );
  }

  return (
    <ViewerProvider memory={memory} frames={frames}>
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>
    </ViewerProvider>
  );
};
