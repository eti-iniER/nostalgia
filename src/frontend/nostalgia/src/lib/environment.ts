export const getEnv = <T = string>(key: string, defaultValue?: T): T => {
  const value = import.meta.env[key];
  if (typeof value !== "string") {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing or invalid env var: ${key}`);
  }
  return value as T;
};
