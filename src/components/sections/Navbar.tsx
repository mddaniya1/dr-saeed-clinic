import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Menu, Phone, Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { clinic } from "@/data/clinic";
import { goToBooking } from "@/lib/booking";

const links = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Services", id: "services", dropdown: true },
  { label: "Doctors", id: "doctors" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-background/85 shadow-sm backdrop-blur-md" : "bg-background"
      }`}
    >
      <nav
        className={`container-page flex items-center justify-between transition-all ${
          scrolled ? "h-[68px]" : "h-20"
        }`}
      >
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.id} className="group relative">
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  active === link.id ? "text-primary" : "text-navy hover:text-primary"
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-4 w-4" />}
              </button>
              {link.dropdown && (
                <div className="pointer-events-none absolute top-full left-0 w-56 translate-y-2 pt-3 opacity-0 transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-xl border border-border bg-card p-2 shadow-card">
                    <button
                      type="button"
                      onClick={() => scrollTo("services")}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-navy hover:bg-mint"
                    >
                      Dental &amp; Aesthetics
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollTo("services")}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-navy hover:bg-mint"
                    >
                      Physiotherapy
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-primary">
              <Phone className="h-4 w-4" />
            </span>
            {clinic.phoneDisplay}
          </a>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goToBooking()}
            className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Make Appointment
          </motion.button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-navy lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] px-6 py-8">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col gap-6">
              <Logo />
              <ul className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="w-full py-3 text-left text-lg font-semibold text-navy"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <a
                href={`tel:${clinic.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-navy"
              >
                <Phone className="h-4 w-4 text-primary" />
                {clinic.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  goToBooking();
                }}
                className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                Make Appointment
              </button>
              <div className="flex gap-3">
                <a
                  href={clinic.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mint text-primary"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={clinic.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mint text-primary"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
