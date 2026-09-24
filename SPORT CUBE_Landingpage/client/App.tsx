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
    const easySpeech = document.createElement("easy-speech");
    const easySpeechAttributes = {
      display: "flex",
      position: "fixed",
      bottom: "1.25rem",
      right: "1.25rem",
      width: "60px",
      height: "60px",
      "z-index": "9998",
      "bg-color": "#151414",
      fill: "#ffffff",
      "info-box": "none",
      "single-page-mode": "true",
      "run-across-sites": "true",
      langs: "de-DE",
      positionm: "fixed",
      bottomm: "1rem",
      rightm: "1rem",
      widthm: "44px",
      heightm: "44px",
      "z-indexm": "9998",
    };

    Object.entries(easySpeechAttributes).forEach(([name, value]) => {
      easySpeech.setAttribute(name, value);
    });
    document.body.appendChild(easySpeech);

    const positionAssist = () => {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth <= 700;
      const isTablet = viewportWidth > 700 && viewportWidth < 1024;
      const edgeOffset = isMobile ? "0.75rem" : isTablet ? "1rem" : "1.25rem";
      const easySpeechSize = isMobile ? "44px" : isTablet ? "52px" : "60px";
      const easySpeechOffset = isMobile ? "0.75rem" : isTablet ? "1rem" : "1.25rem";
      const assistBottom = `calc(${easySpeechOffset} + ${easySpeechSize} + 2px)`;
      easySpeech.style.setProperty("position", "fixed", "important");
      easySpeech.style.setProperty("right", easySpeechOffset, "important");
      easySpeech.style.setProperty("bottom", easySpeechOffset, "important");
      easySpeech.style.setProperty("width", easySpeechSize, "important");
      easySpeech.style.setProperty("height", easySpeechSize, "important");
      easySpeech.style.setProperty("z-index", "9998", "important");
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
      }

    };

    positionAssist();
    const interval = window.setInterval(positionAssist, 250);
    return () => {
      window.clearInterval(interval);
      easySpeech.remove();
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
