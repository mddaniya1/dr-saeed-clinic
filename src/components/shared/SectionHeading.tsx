import * as motionReact from "motion/react";
import { fadeUp, viewport } from "@/lib/motion";

const { motion } = motionReact;

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`${align === "center" ? "mx-auto text-center" : "text-left"} max-w-2xl ${className}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2-section mt-3">{title}</h2>
    </motion.div>
  );
}
