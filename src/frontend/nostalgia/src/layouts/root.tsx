import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col p-4">
      <Outlet />
    </main>
  );
};
