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
      "positionm": "fixed",
      "bottomm": "1rem",
      "rightm": "1rem",
      "widthm": "44px",
      "heightm": "44px",
      "z-indexm": "9998",
    };

    Object.entries(easySpeechAttributes).forEach(([name, value]) => {
      easySpeech.setAttribute(name, value);
    });

    easySpeech.style.setProperty("position", "fixed", "important");
    easySpeech.style.setProperty("right", "1.25rem", "important");
    easySpeech.style.setProperty("bottom", "1.25rem", "important");
    easySpeech.style.setProperty("z-index", "9998", "important");
    document.body.appendChild(easySpeech);

    const positionAssist = () => {
      const isMobile = window.matchMedia("(max-width: 700px)").matches;
      const assistBottom = isMobile ? "4.25rem" : "5.25rem";
      const externalAssist = document.querySelector<HTMLElement>(
        'aside[aria-label^="Visuelle Assistenzsoftware"]',
      );
      if (externalAssist) {
        externalAssist.style.setProperty("position", "fixed", "important");
        externalAssist.style.setProperty("top", "auto", "important");
        externalAssist.style.setProperty("right", "1.25rem", "important");
        externalAssist.style.setProperty("bottom", assistBottom, "important");
        externalAssist.style.setProperty("left", "auto", "important");
        externalAssist.style.setProperty("z-index", "9999", "important");
        externalAssist.style.setProperty(
          "transform",
          isMobile ? "scale(0.75)" : "none",
          "important",
        );
        externalAssist.style.setProperty(
          "transform-origin",
          "bottom right",
          "important",
        );
      }

      const shadowRoot = (window as Window & { eyeAble_shadowRoot?: ShadowRoot }).eyeAble_shadowRoot;
      const assist = shadowRoot?.getElementById("eyeAble_columID");
      if (assist) {
        assist.style.setProperty("position", "fixed", "important");
        assist.style.setProperty("top", "auto", "important");
        assist.style.setProperty("right", "1.25rem", "important");
        assist.style.setProperty("bottom", assistBottom, "important");
        assist.style.setProperty("left", "auto", "important");
        assist.style.setProperty("z-index", "9999", "important");
        assist.style.setProperty(
          "transform",
          isMobile ? "scale(0.75)" : "none",
          "important",
        );
        assist.style.setProperty(
          "transform-origin",
          "bottom right",
          "important",
        );
      }
      const icon = shadowRoot?.getElementById("mainIconID");
      if (icon) {
        icon.style.setProperty("margin-left", "0", "important");
        icon.style.setProperty("margin-right", "0", "important");
        icon.style.setProperty("padding-left", "0px", "important");
        icon.style.setProperty("padding-right", "0px", "important");
      }
      const mobileLabel = shadowRoot?.querySelector<HTMLElement>('[eaarialangid="accessibleLinkTextMobile"]');
      mobileLabel?.setAttribute("aria-label", "Visuelle Assistenzsoftware öffnen");
      const accessibleLink = shadowRoot?.querySelector<HTMLElement>('[ealangid="accessibleLinkText"]');
      if (accessibleLink) {
        accessibleLink.textContent = "Visuelle Assistenzsoftware öffnen. Mit der Tastatur über ALT + 1 erreichbar";
        accessibleLink.setAttribute("aria-label", "Visuelle Assistenzsoftware öffnen");
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
