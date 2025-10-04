import { useEditor } from "@/hooks/use-editor";
import { createContext } from "react";

export const EditorContext = createContext<ReturnType<typeof useEditor> | null>(
  null,
);
