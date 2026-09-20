import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import type { Department } from "@/data/clinic";
import { goToBooking } from "@/lib/booking";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const panels = [
  {
    img: g1,
    title: "Dental Implants",
    category: "Dental Treatment",
    department: "Dental & Aesthetics" as Department,
  },
  {
    img: g2,
    title: "Smile Makeover",
    category: "Aesthetic Dentistry",
    department: "Dental & Aesthetics" as Department,
  },
  {
    img: g3,
    title: "Root Canal Care",
    category: "Endodontics",
    department: "Dental & Aesthetics" as Department,
  },
  {
    img: g4,
    title: "Physiotherapy & Rehab",
    category: "Physiotherapy",
    department: "Physiotherapy" as Department,
  },
];

export function Gallery() {
  const [active, setActive] = useState(2);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Our Work" title="Explore Our Treatments" />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto lg:overflow-visible"
        >
          {panels.map((panel, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={panel.title}
                variants={fadeUp}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ flexGrow: isActive ? 3.2 : 1 }}
                className="relative h-[340px] w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl transition-[flex-grow] duration-600 lg:h-[420px] lg:w-auto lg:shrink lg:basis-0"
              >
                <img
                  src={panel.img}
                  alt={`${panel.title} — ${panel.category}`}
                  loading="lazy"
                  width={912}
                  height={1200}
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-105"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-5 lg:p-6">
                  <div
                    className={`flex items-end justify-between gap-4 transition-all duration-500 lg:opacity-0 ${
                      isActive ? "lg:translate-y-0 lg:opacity-100" : "lg:translate-y-3"
                    }`}
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-white lg:text-xl">
                        {panel.title}
                      </h3>
                      <p className="text-xs text-white/80">{panel.category}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Book ${panel.title}`}
                      onClick={() => goToBooking(panel.department)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition hover:bg-white/40"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-4 flex justify-center gap-2 lg:hidden">
          {panels.map((p, i) => (
            <span
              key={p.title}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
