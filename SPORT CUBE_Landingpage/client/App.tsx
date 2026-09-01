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
      const assist = document.querySelector<HTMLElement>(".eyeAble_container_b, #eyeAble_container_b, #eyeAble_container_ID, [id^='eyeAble_container']");
      if (!assist) return;
      if (assist.style.getPropertyValue("top") !== "auto") assist.style.setProperty("top", "auto", "important");
      if (assist.style.getPropertyValue("right") !== "1.25rem") assist.style.setProperty("right", "1.25rem", "important");
      if (assist.style.getPropertyValue("bottom") !== "9rem") assist.style.setProperty("bottom", "9rem", "important");
      if (assist.style.getPropertyValue("left") !== "auto") assist.style.setProperty("left", "auto", "important");
      if (assist.style.getPropertyValue("z-index") !== "9999") assist.style.setProperty("z-index", "9999", "important");
    };

    positionAssist();
    const observer = new MutationObserver(positionAssist);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
    return () => observer.disconnect();
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
