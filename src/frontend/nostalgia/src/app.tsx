import "@/app.css";
import { Editor } from "@/app/editor";
import { Home } from "@/app/home";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/layouts";
import { EditorLayout } from "@/layouts/editor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="e" element={<EditorLayout />}>
          <Route path=":id" element={<Editor />} />
        </Route>
      </Route>
    </Routes>
  );
};

export const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        <Toaster position="top-right" theme="dark" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
