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
      const shadowRoot = (window as Window & { eyeAble_shadowRoot?: ShadowRoot }).eyeAble_shadowRoot;
      const assist = shadowRoot?.getElementById("eyeAble_columID");
      if (assist) {
        assist.style.setProperty("position", "fixed", "important");
        assist.style.setProperty("top", "auto", "important");
        assist.style.setProperty("right", "1.25rem", "important");
        assist.style.setProperty("bottom", "9rem", "important");
        assist.style.setProperty("left", "auto", "important");
        assist.style.setProperty("z-index", "9999", "important");
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
    return () => window.clearInterval(interval);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <button
        id="easy-speech-custom"
        type="button"
        aria-label="Einfache Sprache öffnen"
        onClick={async () => {
          const api = (window as Window & { EA?: { isEasyActive: () => boolean; activateEasy: () => Promise<void>; deactivateEasy: () => Promise<void> } }).EA;
          if (!api) return;
          try {
            if (api.isEasyActive()) await api.deactivateEasy();
            else await api.activateEasy();
          } catch {
            return;
          }
        }}
        className="fixed bottom-5 right-[1.25rem] z-[60] border border-ink/20 bg-cream/95 px-3 py-2 text-xs font-bold text-ink shadow-lg backdrop-blur-sm"
      >
        Einfache Sprache
      </button>
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
