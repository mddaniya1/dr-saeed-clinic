import { useState } from "react";
import { motion } from "motion/react";
import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/shared/Logo";
import { TermsDialog } from "@/components/shared/TermsDialog";
import { clinic } from "@/data/clinic";
import { weeklySchedule } from "@/lib/schedule";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const pages = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Doctors", id: "doctors" },
  { label: "Appointment", id: "appointment" },
  { label: "FAQ", id: "contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // TODO(client): connect a real newsletter provider.
    toast.success("Thanks! You're on the list.");
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-footer py-16 text-white/70">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]"
      >
        <motion.div variants={fadeUp}>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-7">
            Advanced dental, implant, aesthetic &amp; physiotherapy care in Nazimabad, Karachi.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={clinic.directions}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {clinic.address.full}
              </a>
            </li>
            <li>
              <a href={`tel:${clinic.phone}`} className="flex gap-3 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {clinic.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                WhatsApp us
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="font-display text-base font-bold text-white">Pages</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {pages.map((p) => (
              <li key={p.label}>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="transition-all hover:translate-x-1 hover:text-primary"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="font-display text-base font-bold text-white">Time Schedule</h3>
          <ul className="mt-5 space-y-2 text-[13px]">
            {weeklySchedule.map((d) => (
              <li key={d.day} className="flex justify-between gap-3">
                <span>{d.day}</span>
                <span className={d.day === "Sunday" ? "text-destructive" : "text-white/80"}>
                  {d.hours.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="font-display text-base font-bold text-white">Subscribe Newsletter</h3>
          <p className="mt-3 text-sm">Dental care tips &amp; clinic updates</p>
          <form onSubmit={subscribe} className="mt-5 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              className="h-12 w-full rounded-lg border border-white/15 bg-white/5 px-4 text-base text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/40 focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              Subscribe Now
            </button>
          </form>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Instagram, href: clinic.social.instagram, label: "Instagram" },
              { icon: Facebook, href: clinic.social.facebook, label: "Facebook" },
            ].map((s) => (
              <motion.a
                key={s.label}
                whileHover={{ y: -3 }}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="container-page mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center text-xs sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {new Date().getFullYear()} {clinic.name}. All Rights Reserved.
        </p>
        <TermsDialog
          trigger={
            <button type="button" className="hover:text-white">
              Terms and Conditions
            </button>
          }
        />
      </div>
    </footer>
  );
}
