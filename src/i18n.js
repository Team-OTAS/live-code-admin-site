import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "mm",
    resources: {
      en: {
        translation: {
          greeting: "Hello",
          navTitle: "Stock Management",
        },
      },
      mm: {
        translation: {
          greeting: "မင်္ဂလာပါ",
          navTitle: "စီမံခန့်ခွဲရန်",
        },
      },
    },
  });
