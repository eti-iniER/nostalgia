import { ViewerContext } from "@/contexts/viewer/context";
import { useContext } from "react";

export const useViewerContext = () => {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error("useViewer must be used within a ViewerProvider");
  }
  return context;
};
