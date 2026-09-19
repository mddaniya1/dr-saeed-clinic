import type { Department } from "@/data/clinic";

export const BOOKING_EVENT = "booking:department";

export function goToBooking(department?: Department) {
  if (typeof window === "undefined") return;
  if (department) {
    window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: department }));
  }
  document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });
}
