import "@/app.css";
import { EditorPage } from "@/app/editor";
import { Home } from "@/app/home";
import { Viewer } from "@/app/viewer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/layouts";
import { EditorLayout } from "@/layouts/editor";
import { ViewerLayout } from "@/layouts/viewer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="e" element={<EditorLayout />}>
          <Route path=":memoryUuid" element={<EditorPage />} />
        </Route>
        <Route path="m" element={<ViewerLayout />}>
          <Route path=":memoryUuid" element={<Viewer />} />
        </Route>
      </Route>
    </Routes>
  );
};

export const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider forcedTheme="light" defaultTheme="light" attribute="class">
        <TooltipProvider>
          <Toaster position="top-right" theme="dark" richColors />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
