import { motion } from "motion/react";
import { CountUp } from "@/components/shared/CountUp";
import {
  PATIENT_SATISFACTION_PERCENT,
  PERSONALISED_CARE_PERCENT,
  clinic,
} from "@/data/clinic";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const bars = [
  { label: "Patient Satisfaction", value: PATIENT_SATISFACTION_PERCENT },
  { label: "Personalized Care", value: PERSONALISED_CARE_PERCENT },
];

const stats = [
  { value: 7, suffix: "+", label: "Years of Experience", style: "border-b border-border bg-card" },
  {
    value: clinic.rating,
    suffix: "★",
    label: "Google Rating",
    style: "bg-card shadow-raised md:-translate-y-4",
  },
  { value: clinic.reviews, suffix: "+", label: "Google Reviews", style: "bg-mint" },
  { value: 12, suffix: "+", label: "Treatments & Services", style: "bg-card border border-border" },
];

export function Stats() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Some Fun Fact
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2-section mt-3">
            We Care for Your Teeth
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground"
          >
            Regular dental check-ups and cleanings are essential for preventing cavities, gum
            disease and other oral health problems. We keep every visit comfortable and personal.
          </motion.p>

          <div className="mt-8 max-w-lg space-y-6">
            {bars.map((bar, i) => (
              <motion.div key={bar.label} variants={fadeUp}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy">{bar.label}</span>
                  <span className="font-bold text-navy">{bar.value}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.value}%` }}
                    viewport={viewport}
                    transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-2 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
              className={`rounded-2xl p-5 sm:p-6 ${stat.style}`}
            >
              <p className="font-display text-[32px] leading-none font-bold text-primary sm:text-[40px]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
