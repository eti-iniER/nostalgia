import { EditorContext } from "@/contexts/editor/context";
import { useContext } from "react";

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};
