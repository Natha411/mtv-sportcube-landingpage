import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createElement, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const positionAssist = () => {
      const shadowRoot = (window as Window & { eyeAble_shadowRoot?: ShadowRoot }).eyeAble_shadowRoot;
      const assist = shadowRoot?.getElementById("eyeAble_columID");
      if (!assist) return;
      assist.style.setProperty("position", "fixed", "important");
      assist.style.setProperty("top", "auto", "important");
      assist.style.setProperty("right", "1.25rem", "important");
      assist.style.setProperty("bottom", "9rem", "important");
      assist.style.setProperty("left", "auto", "important");
      assist.style.setProperty("z-index", "9999", "important");
    };

    positionAssist();
    const interval = window.setInterval(positionAssist, 250);
    return () => window.clearInterval(interval);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="pointer-events-auto fixed bottom-5 right-5 z-[60]">
        {createElement("easy-speech")}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
