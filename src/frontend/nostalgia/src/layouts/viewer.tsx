import { EditorProvider } from "@/contexts/editor";
import { Outlet } from "react-router";

export const ViewerLayout = () => {
  return (
    <EditorProvider>
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>
    </EditorProvider>
  );
};
