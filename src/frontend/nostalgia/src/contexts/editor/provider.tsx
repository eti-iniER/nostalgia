import { EditorContext } from "./context";
import { useEditor } from "@/hooks/use-editor";
import type { PropsWithChildren } from "react";

export const EditorProvider = ({ children }: PropsWithChildren) => {
  const editor = useEditor();

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};
