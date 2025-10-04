import { api } from "@/api";
import { ENDPOINTS_TO_SKIP_RETRIES } from "@/constants/api";

export const refreshToken = async () => {
  const response = await api.post("auth/token");
  return response.json();
};

export const shouldRetry = (
  url: string,
  endpointsToSkip: string[] = ENDPOINTS_TO_SKIP_RETRIES,
) => {
  return !endpointsToSkip.some((endpoint) => url.endsWith(endpoint));
};
