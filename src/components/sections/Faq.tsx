import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/clinic";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[40%_1fr] lg:gap-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <p className="eyebrow">FAQ Questions</p>
          <h2 className="h2-section mt-3">Some Of Yours Basic Questions</h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-muted-foreground">
            Quick answers about our timings, treatments and how to book.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={faq.q} variants={fadeUp} className="rounded-lg bg-mint">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex min-h-14 w-full items-center gap-3 px-5 py-4 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <span className="font-display text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="flex-1 text-[15px] font-semibold text-navy">{faq.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-navy transition-transform duration-300 ${
                      isOpen ? "rotate-[135deg]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
