import { motion } from "motion/react";
import { HeartPulse, ShieldCheck } from "lucide-react";
import aboutImage from "@/assets/about-procedure.jpg";
import { fadeRight, fadeUp, stagger, viewport } from "@/lib/motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Specialist-Led Dental Care",
    text: "Led by Dr. Arfa Saeed, a C-Endo root canal specialist certified in facial aesthetics.",
  },
  {
    icon: HeartPulse,
    title: "Caring for Your Whole Health",
    text: "Dental care and physiotherapy rehab under one roof, with male and female DPT experts available.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-mint py-16 md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[36%_1fr] lg:gap-16">
        <div>
          <span className="inline-block rounded-md border border-border px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-navy uppercase">
            Learn About Us
          </span>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0 0 0)" }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 overflow-hidden rounded-2xl"
          >
            <img
              src={aboutImage}
              alt="Dentist treating a patient at the clinic"
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[16/10] w-full object-cover lg:aspect-[4/3]"
            />
          </motion.div>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.h2 variants={fadeRight} className="h2-section max-w-xl">
            Keeping Your Smile Healthy and Bright for All Ages
          </motion.h2>
          <motion.p
            variants={fadeRight}
            className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground"
          >
            At Dr. Saeed Dental, Implant Aesthetic &amp; Physiotherapy Clinic we combine modern
            dentistry with gentle, personalised care — from routine scaling and root canals to
            implants and complete smile makeovers.
          </motion.p>

          <div className="mt-8 space-y-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="flex gap-4">
                <motion.span
                  initial={{ scale: 0.7 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewport}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background text-primary"
                >
                  <f.icon className="h-6 w-6" />
                </motion.span>
                <div>
                  <h3 className="font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-7 text-muted-foreground">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
