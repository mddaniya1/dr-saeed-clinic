import { useState } from "react";
import { motion } from "motion/react";
import { Activity, ArrowRight, Check, Sparkles, Stethoscope, Syringe } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { serviceCards } from "@/data/clinic";
import { goToBooking } from "@/lib/booking";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const icons = [Stethoscope, Syringe, Sparkles, Activity];

export function Services() {
  const [active, setActive] = useState(1);

  return (
    <section id="services" className="bg-background py-16 md:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Our Services" title="What Service We Offer" />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {serviceCards.map((card, i) => {
            const Icon = icons[i];
            const isActive = active === i;
            return (
              <motion.div
                key={card.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex gap-5 rounded-2xl p-6 transition-colors duration-250 sm:p-8 ${
                  isActive ? "bg-mint" : "border border-border bg-card shadow-card"
                }`}
              >
                <span
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full transition-all duration-250 sm:h-16 sm:w-16 ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-mint text-primary"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                    {card.description}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy"
                      >
                        Read More Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{card.title}</DialogTitle>
                      </DialogHeader>
                      <ul className="space-y-2">
                        {card.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-navy">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => goToBooking(card.department)}
                        className="mt-2 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                      >
                        Book this treatment
                      </button>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
