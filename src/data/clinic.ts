export const clinic = {
  name: "Dr. Saeed Dental, Implant Aesthetic & Physiotherapy Clinic",
  shortName: "Dr. Saeed",
  rating: 4.8,
  reviews: 46,
  phone: "+923438234969",
  phoneDisplay: "+92 343 8234969",
  whatsapp: "https://wa.me/923438234969",
  address: {
    full: "3 B 2, 1A Nazimabad Road No. 3, Block 3, Nazimabad, Karachi 74600 (near Habib Metro Bank)",
    street: "3 B 2, 1A Nazimabad Road Number 3",
    area: "Block 3, Nazimabad",
    city: "Karachi",
    postalCode: "74600",
    country: "Pakistan",
    plusCode: "W27J+X6 Nazimabad, Karachi, Pakistan",
  },
  directions:
    "https://www.google.com/maps/search/?api=1&query=W27J%2BX6+Nazimabad+Karachi",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  booking: {
    oladoc: "https://oladoc.com",
    marham: "https://marham.pk",
  },
  consultationFeePkr: 1500,
} as const;

export const doctor = {
  name: "Dr. Arfa Saeed",
  role: "Senior Aesthetic Dental Surgeon · Head of Dental Department",
  credentials: "BDS · C-Endo · Facial Aesthetics · 7–8 Yrs · PMDC Verified",
  qualifications: [
    "BDS (Dow University of Health Sciences)",
    "C-Endo (Root Canal Specialist)",
    "Certified in Facial Aesthetics (Royal Academy of Facial Aesthetics)",
  ],
  experience: "7-8 Years",
} as const;

export const serviceGroups = {
  dental: [
    "Dental Implants",
    "Porcelain & Composite Crowns",
    "Root Canal Treatment (C-Endo)",
    "Composite Veneers & Smile Makeovers",
    "Clear Braces & Aligners",
    "Teeth Whitening & Scaling",
    "HydraFacial & Medical Skin Care Treatments",
  ],
  physio: [
    "Back & Neck Pain Management",
    "Joint & Muscle Injury Rehab",
    "Post-Surgical Rehabilitation",
    "Stroke Recovery & Neurological Rehab",
    "Sports Injuries & Arthritis Treatment",
    "Dedicated Male & Female DPT Experts Available",
  ],
} as const;

export type Department = "Dental & Aesthetics" | "Physiotherapy";

export const departments: Department[] = ["Dental & Aesthetics", "Physiotherapy"];

export const doctorsByDepartment: Record<Department, string[]> = {
  "Dental & Aesthetics": [doctor.name],
  Physiotherapy: ["Male DPT Expert", "Female DPT Expert"],
};

export const serviceCards = [
  {
    id: "root-canal",
    title: "Root Canal Therapy",
    description:
      "Precise, comfortable root canal treatment by a C-Endo certified specialist to save your natural tooth.",
    department: "Dental & Aesthetics" as Department,
    items: [
      "Root Canal Treatment (C-Endo)",
      "Porcelain & Composite Crowns",
      "Teeth Whitening & Scaling",
    ],
  },
  {
    id: "implants",
    title: "Dental Implants & Crowns",
    description:
      "Permanent, natural-looking tooth replacement with dental implants and porcelain or composite crowns.",
    department: "Dental & Aesthetics" as Department,
    items: ["Dental Implants", "Porcelain & Composite Crowns"],
  },
  {
    id: "aesthetic",
    title: "Aesthetic Smile Makeover",
    description:
      "Composite veneers, clear braces & aligners, teeth whitening & scaling, plus HydraFacial skin care.",
    department: "Dental & Aesthetics" as Department,
    items: [
      "Composite Veneers & Smile Makeovers",
      "Clear Braces & Aligners",
      "Teeth Whitening & Scaling",
      "HydraFacial & Medical Skin Care Treatments",
    ],
  },
  {
    id: "physio",
    title: "Physiotherapy & Rehab",
    description:
      "Back & neck pain, joint and sports injuries, post-surgical and stroke rehab with male & female DPT experts.",
    department: "Physiotherapy" as Department,
    items: [...serviceGroups.physio],
  },
];

export const faqs = [
  {
    q: "How often should I visit the dentist?",
    a: "Most people benefit from a check-up and scaling every six months; patients with gum problems, implants or braces may need more frequent visits. Dr. Arfa will suggest a schedule after your first consultation.",
  },
  {
    q: "What is the consultation fee and how do I book?",
    a: "A consultation with Dr. Arfa Saeed is PKR 1,500. Book through the form above (it opens WhatsApp), message or call +92 343 8234969, or use Oladoc / Marham.",
  },
  {
    q: "What are your clinic timings?",
    a: "Monday to Saturday. Dental slots: 11:00 AM–1:00 PM and 3:00 PM–10:00 PM; on Fridays 5:00 PM–10:00 PM. Closed on Sundays.",
  },
  {
    q: "Do you offer physiotherapy too?",
    a: "Yes. We treat back & neck pain, joint and muscle injuries, post-surgical rehabilitation, stroke and neurological rehab, sports injuries and arthritis, with male and female DPT experts available.",
  },
  {
    q: "Which dental treatments do you offer?",
    a: "Dental implants, porcelain & composite crowns, root canal treatment (C-Endo), composite veneers & smile makeovers, clear braces & aligners, teeth whitening & scaling, and HydraFacial & medical skin care.",
  },
];

// TODO(client): confirm or replace this decorative value.
export const PERSONALISED_CARE_PERCENT = 90;
export const PATIENT_SATISFACTION_PERCENT = 96;

// TODO(client): add a real clinic tour video URL to show the play button.
export const VIDEO_URL = "";
