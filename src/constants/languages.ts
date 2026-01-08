export const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "sv",
    label: "Svenska",
  },
] as const;

export type LanguageCode = (typeof languages)[number]["value"];
