import { getEnv } from "@/lib/environment";

export const environment = {
  API_URL: getEnv("VITE_API_URL"),
} as const;
