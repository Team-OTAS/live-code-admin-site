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
          navTitle3: "Order Management",
          navTitle2: "Live Sale",
        },
      },
      mm: {
        translation: {
          greeting: "မင်္ဂလာပါ",
          navTitle: "Stock စီမံခန့်ခွဲရန်",
          navTitle3: "အော်ဒါစီမံခန့်ခွဲရန်",
          navTitle2: "Live လွှင့်ရောင်းရန်",
        },
      },
    },
  });
