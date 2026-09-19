import { motion } from "motion/react";
import { ArrowRight, Heart, Star } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.png";
import { clinic } from "@/data/clinic";
import { goToBooking } from "@/lib/booking";
import { fadeUp, stagger } from "@/lib/motion";

const initials = ["AK", "SR", "MZ"];

export function Hero() {
  return (
    <section id="home" className="bg-mint">
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[42%_1fr] lg:gap-8 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex justify-center self-end lg:order-1"
        >
          <img
            src={heroDoctor}
            alt="Dentist at Dr. Saeed Dental Clinic"
            width={912}
            height={1200}
            className="max-h-[420px] w-auto object-contain lg:max-h-[560px]"
          />
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="order-1 text-center lg:order-2 lg:py-24 lg:text-left"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 lg:justify-start"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <Heart className="h-4 w-4 fill-destructive text-destructive" />
            </span>
            <span className="eyebrow">Where Smiles Begin</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="h1-hero mt-5">
            Smile with
            <br />
            Confidence
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-[420px] text-[15px] leading-7 text-muted-foreground lg:mx-0"
          >
            Advanced dental, implant &amp; aesthetic care with expert physiotherapy — all under one
            roof in Nazimabad, Karachi.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
          >
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => goToBooking()}
              className="group flex h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              Book Consultation
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20 transition-transform group-hover:translate-x-[3px]">
                <ArrowRight className="h-3 w-3" />
              </span>
            </motion.button>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-3">
                {initials.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.4 + i * 0.1 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-navy ring-2 ring-white"
                  >
                    {t}
                  </motion.span>
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-white">
                  <Star className="h-4 w-4 fill-current" />
                </span>
              </div>
              <div className="text-left">
                <p className="font-display text-base font-bold text-navy">{clinic.rating} / 5</p>
                <p className="text-xs text-muted-foreground">
                  Google Rating · {clinic.reviews} Reviews
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
