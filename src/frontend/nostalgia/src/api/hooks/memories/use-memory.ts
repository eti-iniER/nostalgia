import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

const getMemory = async (id: string) => {
  const response = await api.get(`memories/${id}`);
  return response.json();
};

interface UseMemoryParams {
  id: string;
}

export const useMemory = ({ id }: UseMemoryParams) => {
  return useQuery({
    queryKey: ["memory", id],
    queryFn: () => getMemory(id),
    enabled: !!id,
  });
};
