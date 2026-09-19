const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

export const stagger = (s = 0.1, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

export const viewport = { once: true, amount: 0.25 } as const;
export { ease };
