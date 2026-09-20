function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mx-6 h-8 w-8 shrink-0 fill-primary sm:h-10 sm:w-10"
    >
      <path d="M12 0c.6 5.6 6.4 11.4 12 12-5.6.6-11.4 6.4-12 12-.6-5.6-6.4-11.4-12-12C5.6 11.4 11.4 5.6 12 0Z" />
    </svg>
  );
}

function Row({
  words,
  direction,
  outline,
}: {
  words: string[];
  direction: "left" | "right";
  outline?: boolean;
}) {
  const group = (
    <div className="flex items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span
            className={`font-display leading-none font-semibold whitespace-nowrap ${
              outline ? "marquee-outline" : "text-marquee"
            }`}
            style={{ fontSize: "clamp(44px, 9vw, 88px)" }}
          >
            {w}
          </span>
          <Sparkle />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee-track ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
      {group}
      {group}
      {group}
      {group}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="overflow-hidden py-8 md:py-12" aria-hidden="true">
      <Row words={["Fresh Breath", "Healthy Smile"]} direction="left" />
      <div className="mt-2 translate-x-6">
        <Row words={["Pure Pearls", "Gleam Bright Smile"]} direction="right" outline />
      </div>
    </section>
  );
}
