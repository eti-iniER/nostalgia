import { api } from "@/api/config";
import { useMutation } from "@tanstack/react-query";

const getNextFrame = async (memoryUuid: string) => {
  const response = await api.post<Frame>(`memories/${memoryUuid}/new-frame/`);
  return response.json();
};

export const useGetNextFrame = (memoryUuid: string) => {
  return useMutation({
    mutationFn: () => getNextFrame(memoryUuid),
  });
};
