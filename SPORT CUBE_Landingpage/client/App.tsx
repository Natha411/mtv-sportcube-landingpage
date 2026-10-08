import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
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
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth <= 700;
      const isTablet = viewportWidth > 700 && viewportWidth < 1024;
      const edgeOffset = isMobile ? "0.75rem" : isTablet ? "1rem" : "1.25rem";
      const languageButtonSize = isMobile ? "44px" : isTablet ? "52px" : "60px";
      const languageButtonOffset = isMobile ? "0.75rem" : isTablet ? "1rem" : "1.25rem";
      const assistBottom = `calc(${languageButtonOffset} + ${languageButtonSize} + 2px)`;
      const shadowRoot = (window as Window & { eyeAble_shadowRoot?: ShadowRoot }).eyeAble_shadowRoot;
      const assistColumn = shadowRoot?.getElementById("eyeAble_columID");
      if (assistColumn) {
        assistColumn.style.setProperty("position", "fixed", "important");
        assistColumn.style.setProperty("top", "auto", "important");
        assistColumn.style.setProperty("right", edgeOffset, "important");
        assistColumn.style.setProperty("bottom", assistBottom, "important");
        assistColumn.style.setProperty("left", "auto", "important");
        assistColumn.style.setProperty("z-index", "100001", "important");
      }
      const externalAssist = Array.from(
        document.querySelectorAll<HTMLElement>("aside"),
      ).find((aside) => aside.querySelector("a.eyeAble_hiddenOpener"));
      if (externalAssist) {
        externalAssist.style.setProperty("position", "fixed", "important");
        externalAssist.style.setProperty("top", "auto", "important");
        externalAssist.style.setProperty("right", edgeOffset, "important");
        externalAssist.style.setProperty("bottom", assistBottom, "important");
        externalAssist.style.setProperty("left", "auto", "important");
        externalAssist.style.setProperty("z-index", "100001", "important");
        externalAssist.style.setProperty("background", "transparent", "important");
        externalAssist.style.setProperty("border", "0", "important");
        externalAssist.style.setProperty("box-shadow", "none", "important");
        externalAssist.style.setProperty("padding", "0", "important");
        externalAssist.style.setProperty("margin", "0", "important");
      }

    };

    positionAssist();
    const interval = window.setInterval(positionAssist, 250);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
