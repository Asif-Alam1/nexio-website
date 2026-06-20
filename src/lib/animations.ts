export const EASE = {
  smooth: "power3.out",
  snappy: "power4.out",
  bounce: "back.out(1.7)",
  entrance: [0.16, 1, 0.3, 1],
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  entrance: 0.8,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;
