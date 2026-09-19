import { clinic } from "@/data/clinic";

export type BookingMessage = {
  name: string;
  phone: string;
  email: string;
  dateTime: string;
  department: string;
  doctor: string;
  message: string;
};

export function buildWhatsAppUrl(data: BookingMessage) {
  const text = [
    "Assalam o Alaikum, I'd like to book an appointment at Dr. Saeed Dental Clinic.",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Date & Time: ${data.dateTime}`,
    `Department: ${data.department}`,
    `Doctor: ${data.doctor}`,
    `Message: ${data.message}`,
  ].join("\n");

  return `${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
}
