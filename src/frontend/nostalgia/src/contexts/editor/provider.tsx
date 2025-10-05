import { EditorContext } from "./context";
import { useEditor } from "@/hooks/use-editor";
import type { PropsWithChildren } from "react";

interface EditorProviderProps {
  editorId?: string;
}
export const EditorProvider = ({
  editorId,
  children,
}: EditorProviderProps & PropsWithChildren) => {
  const editor = useEditor(editorId);

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};
