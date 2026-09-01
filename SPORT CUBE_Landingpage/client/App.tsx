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
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth <= 700;
      const isTablet = viewportWidth > 700 && viewportWidth < 1024;
      const iconSize = isMobile ? "44px" : isTablet ? "52px" : "60px";
      const edgeOffset = isMobile ? "0.75rem" : isTablet ? "1rem" : "1.25rem";
      const easyBottom = isMobile ? "0.75rem" : isTablet ? "1rem" : "1.25rem";
      const assistBottom = isMobile ? "3.75rem" : isTablet ? "4.5rem" : "5.25rem";
      const assistScale = isMobile ? "0.7" : isTablet ? "0.86" : "1";
      easySpeech.style.setProperty("right", edgeOffset, "important");
      easySpeech.style.setProperty("bottom", easyBottom, "important");
      easySpeech.style.setProperty("width", iconSize, "important");
      easySpeech.style.setProperty("height", iconSize, "important");
      const externalAssist = document.querySelector<HTMLElement>(
        'aside[aria-label^="Visuelle Assistenzsoftware"]',
      );
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
        externalAssist.style.setProperty("width", "max-content", "important");
        externalAssist.style.setProperty("height", "max-content", "important");
        externalAssist.style.setProperty("min-width", "0", "important");
        externalAssist.style.setProperty("min-height", "0", "important");
        externalAssist.style.setProperty(
          "transform",
          `scale(${assistScale})`,
          "important",
        );
        externalAssist.style.setProperty(
          "transform-origin",
          "bottom right",
          "important",
        );
      }

      const shadowRoot = (window as Window & { eyeAble_shadowRoot?: ShadowRoot }).eyeAble_shadowRoot;
      const toolbar = shadowRoot?.getElementById("eyeAble_fixedHeaderToolbarID");
      if (toolbar) {
        toolbar.style.setProperty("display", "flex", "important");
        toolbar.style.setProperty("flex-direction", "column", "important");
        toolbar.style.setProperty("justify-content", "flex-end", "important");
        toolbar.style.setProperty("align-items", "flex-end", "important");
        toolbar.style.setProperty("background", "transparent", "important");
        toolbar.style.setProperty("border", "0", "important");
        toolbar.style.setProperty("box-shadow", "none", "important");
        toolbar.style.setProperty("padding", "0", "important");
        toolbar.style.setProperty("margin", "0", "important");
        toolbar.style.setProperty("width", "max-content", "important");
        toolbar.style.setProperty("height", "max-content", "important");
        toolbar.style.setProperty("min-width", "0", "important");
        toolbar.style.setProperty("min-height", "0", "important");
      }

      const assist = shadowRoot?.getElementById("eyeAble_columID");
      if (assist) {
        assist.style.setProperty("display", "flex", "important");
        assist.style.setProperty("flex-direction", "column", "important");
        assist.style.setProperty("justify-content", "flex-start", "important");
        assist.style.setProperty("align-items", "center", "important");
        assist.style.setProperty("max-height", "0px", "important");
        assist.style.setProperty("position", "fixed", "important");
        assist.style.setProperty("top", "auto", "important");
        assist.style.setProperty("right", edgeOffset, "important");
        assist.style.setProperty("bottom", assistBottom, "important");
        assist.style.setProperty("left", "auto", "important");
        assist.style.setProperty("z-index", "100001", "important");
        assist.style.setProperty(
          "transform",
          `scale(${assistScale})`,
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
