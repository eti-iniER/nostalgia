import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

const getFrame = async (
  memoryUuid: string,
  frameUuid: string,
): Promise<Frame> => {
  const response = await api.get(`memories/${memoryUuid}/frames/${frameUuid}/`);
  return response.json();
};

interface UseFrameParams {
  memoryUuid: string;
  frameUuid: string;
}

export const useFrame = ({ memoryUuid, frameUuid }: UseFrameParams) => {
  return useQuery<Frame>({
    queryKey: ["frame", memoryUuid, frameUuid],
    queryFn: () => getFrame(memoryUuid, frameUuid),
    enabled: !!memoryUuid && !!frameUuid,
  });
};
