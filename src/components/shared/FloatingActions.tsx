import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { clinic } from "@/data/clinic";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3">
      {showTop && (
        <button
          type="button"
          aria-label="Scroll back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transition hover:bg-primary-dark"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href={clinic.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with the clinic on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-raised transition hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
