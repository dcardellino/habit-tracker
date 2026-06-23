export const CATEGORY_OPTIONS = [
  "fitness",
  "learning",
  "mindfulness",
  "nutrition",
  "sleep",
  "other",
] as const;

export type Category = (typeof CATEGORY_OPTIONS)[number];
