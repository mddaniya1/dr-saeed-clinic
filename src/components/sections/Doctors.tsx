import { motion } from "motion/react";
import { ArrowRight, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import arfa from "@/assets/doctor-arfa.jpg";
import dptMale from "@/assets/doctor-dpt-male.jpg";
import dptFemale from "@/assets/doctor-dpt-female.jpg";
import { clinic, doctor } from "@/data/clinic";
import { goToBooking } from "@/lib/booking";
import { fadeLeft, fadeUp, stagger, viewport } from "@/lib/motion";

// TODO(client): replace the DPT placeholder names and photos with the real team.
const team = [
  { img: arfa, name: doctor.name, role: doctor.role, credentials: doctor.credentials },
  { img: dptMale, name: "Physiotherapy Team", role: "Male DPT Expert", credentials: "" },
  { img: dptFemale, name: "Physiotherapy Team", role: "Female DPT Expert", credentials: "" },
];

const socials = [
  { icon: Instagram, href: clinic.social.instagram, label: "Instagram" },
  { icon: Facebook, href: clinic.social.facebook, label: "Facebook" },
  { icon: MessageCircle, href: clinic.whatsapp, label: "WhatsApp" },
  { icon: Phone, href: `tel:${clinic.phone}`, label: "Call the clinic" },
  { icon: MapPin, href: clinic.directions, label: "Directions" },
];

export function Doctors() {
  return (
    <section id="doctors" className="bg-background py-16 md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr_auto]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p className="eyebrow">Team Members</p>
            <h2 className="h2-section mt-3">Meet with Our Doctors</h2>
          </motion.div>
          <motion.p
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="max-w-[420px] text-[15px] leading-7 text-muted-foreground"
          >
            Experienced dental and physiotherapy professionals who put your comfort and long-term
            health first.
          </motion.p>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goToBooking()}
            className="group flex h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            Find Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
          </motion.button>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible"
        >
          {team.map((member, i) => (
            <motion.article
              key={`${member.name}-${i}`}
              variants={fadeUp}
              className="w-[76%] shrink-0 snap-center md:w-auto"
            >
              <div className="group relative overflow-hidden rounded-2xl bg-mint">
                <img
                  src={member.img}
                  alt={`${member.name} — ${member.role}`}
                  loading="lazy"
                  width={800}
                  height={960}
                  className="aspect-[4/4.6] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 bg-white/85 py-3 backdrop-blur transition-transform duration-400 group-hover:translate-y-0">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <h3 className="mt-4 font-display text-[22px] font-bold">{member.name}</h3>
              <p className="mt-1 text-[13px] text-muted-foreground">{member.role}</p>
              {member.credentials && (
                <p className="mt-1 text-[12px] text-primary">{member.credentials}</p>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
