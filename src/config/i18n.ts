import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../locales/en/common.json";
import svCommon from "../locales/sv/common.json";
import enAuth from "../locales/en/auth.json";
import svAuth from "../locales/sv/auth.json";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, auth: enAuth },
      sv: { common: svCommon, auth: svAuth },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "sv"],
    defaultNS: "common",
    ns: ["common", "auth"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
