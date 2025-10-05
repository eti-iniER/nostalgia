import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface CreateMemoryPayload {
  title: string;
  description: string;
  isPublic: boolean;
  userId: string;
  password?: string;
}

const createMemory = async (payload: CreateMemoryPayload) => {
  const response = await api.post("memories/", {
    json: payload,
  });
  return response.json();
};

interface UseCreateMemoryParams {
  userId: string;
}

export const useCreateMemory = ({ userId }: UseCreateMemoryParams) => {
  return useMutation({
    mutationFn: (payload: Omit<CreateMemoryPayload, "userId">) =>
      createMemory({ ...payload, userId }),
  });
};
