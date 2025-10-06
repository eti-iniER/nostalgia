import { EditorProvider } from "@/contexts/editor";
import { Outlet, useParams } from "react-router";

export const EditorLayout = () => {
  const { editorId } = useParams<{ editorId: string }>();

  return (
    <EditorProvider editorId={editorId}>
      <div className="flex h-full w-full flex-1 flex-col">
        <Outlet />
      </div>
    </EditorProvider>
  );
};
