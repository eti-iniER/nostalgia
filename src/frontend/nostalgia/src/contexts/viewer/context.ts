import { useViewer } from "@/hooks/use-viewer";
import { createContext } from "react";

export const ViewerContext = createContext<ReturnType<typeof useViewer> | null>(
  null,
);
