import { Outlet } from "react-router";

export const ViewerLayout = () => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Outlet />
    </div>
  );
};
