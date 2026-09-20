import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import ctaClinician from "@/assets/cta-clinician.png";
import { clinic } from "@/data/clinic";
import { goToBooking } from "@/lib/booking";
import { viewport } from "@/lib/motion";

export function CtaBanner() {
  return (
    <section className="bg-background py-8 md:py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7 }}
          className="relative grid items-end overflow-hidden rounded-3xl bg-gradient-to-r from-[oklch(0.73_0.14_219)] to-[oklch(0.66_0.13_224)] px-7 pt-8 lg:min-h-[280px] lg:grid-cols-[1fr_auto] lg:px-12 lg:pt-12"
        >
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 600 300"
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-y-0 right-0 h-full w-[60%] opacity-[0.12]"
          >
            {[0, 40, 80, 120, 160, 200, 240].map((y) => (
              <path
                key={y}
                d={`M0 ${y} C 150 ${y - 40}, 300 ${y + 40}, 600 ${y}`}
                stroke="white"
                fill="none"
                strokeWidth="2"
              />
            ))}
          </motion.svg>

          <div className="relative z-10 pb-10">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
              Book a Consultation
            </span>
            <h2 className="h2-section mt-4 max-w-md !text-white">
              Keeping Your Smile Healthy &amp; Bright
            </h2>
            <p className="mt-4 max-w-[420px] text-[15px] leading-7 text-white/80">
              Book your visit with Dr. Arfa Saeed for dental implants, root canal, smile makeovers
              and more.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goToBooking()}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-primary sm:w-auto"
              >
                Get Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
              </motion.button>
              <a href={`tel:${clinic.phone}`} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-white">
                  <span className="block text-xs text-white/80">Call Us</span>
                  <span className="block text-sm font-bold">{clinic.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </div>

          <motion.img
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.2 }}
            src={ctaClinician}
            alt="Clinician at Dr. Saeed Clinic"
            loading="lazy"
            width={912}
            height={1104}
            className="relative z-10 mx-auto max-h-[300px] w-auto self-end object-contain lg:max-h-[340px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
