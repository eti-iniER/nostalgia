import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface UpdateFramePayload {
  type: FrameType;
  content?: string;
  images?: File[];
}

const updateFrame = async (
  memoryUuid: string,
  frameUuid: string,
  payload: UpdateFramePayload,
) => {
  const body = new FormData();

  body.append("type", payload.type);

  if (payload.content) {
    body.append("content", payload.content);
  }

  if (payload.images) {
    payload.images.forEach((image) => {
      body.append("images", image);
    });
  }

  const response = await api.patch(
    `memories/${memoryUuid}/frames/${frameUuid}/`,
    {
      body: body,
    },
  );
  return response.json();
};

interface UseUpdateFrameParams {
  memoryUuid: string;
  frameUuid: string;
}

export const useUpdateFrame = ({
  memoryUuid,
  frameUuid,
}: UseUpdateFrameParams) => {
  return useMutation({
    mutationFn: (payload: UpdateFramePayload) =>
      updateFrame(memoryUuid, frameUuid, payload),
  });
};
