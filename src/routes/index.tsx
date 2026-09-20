import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/sections/Marquee";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Doctors } from "@/components/sections/Doctors";
import { Appointment } from "@/components/sections/Appointment";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/shared/FloatingActions";
import { clinic, doctor } from "@/data/clinic";

const title =
  "Dr. Saeed Dental, Implant Aesthetic & Physiotherapy Clinic | Nazimabad, Karachi";
const description =
  "Dental implants, root canal (C-Endo), smile makeovers and physiotherapy in Nazimabad, Karachi. Book with Dr. Arfa Saeed — 4.8★ on Google.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  telephone: clinic.phone,
  url: "https://drsaeedclinic.lovable.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: `${clinic.address.area}, ${clinic.address.city}`,
    postalCode: clinic.address.postalCode,
    addressCountry: "PK",
  },
  hasMap: clinic.directions,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: clinic.rating,
    reviewCount: clinic.reviews,
  },
  employee: [{ "@type": "Person", name: doctor.name, jobTitle: doctor.role }],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
      opens: "11:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
      opens: "15:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "17:00",
      closes: "22:00",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Stats />
        <Marquee />
        <Gallery />
        <CtaBanner />
        <Doctors />
        <Appointment />
        <Faq />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" />
    </>
  );
}
