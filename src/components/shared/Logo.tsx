import logo from "@/assets/dr-saeed-logo.jpg.asset.json";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label="Dr. Saeed Clinic home">
      <img
        src={logo.url}
        alt="Dr. Saeed clinic logo"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
      />
      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-bold ${light ? "text-white" : "text-navy"}`}
        >
          Dr. Saeed
        </span>
        <span
          className={`block text-[10px] tracking-wide ${light ? "text-white/60" : "text-muted-foreground"}`}
        >
          Dental · Implant · Physio
        </span>
      </span>
    </a>
  );
}
