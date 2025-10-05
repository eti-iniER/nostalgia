import { ViewerContext } from "./context";
import { useViewer } from "@/hooks/use-viewer";
import type { PropsWithChildren } from "react";

interface ViewerProviderProps extends PropsWithChildren {
  memory: Memory;
  frames: Frame[];
}

export const ViewerProvider = ({
  memory,
  frames,
  children,
}: ViewerProviderProps) => {
  const viewer = useViewer({ memory, frames });

  return (
    <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  );
};
