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
          navTitle2: "Order Management",
          navTitle3: "Live Sale",
        },
      },
      mm: {
        translation: {
          greeting: "မင်္ဂလာပါ",
          navTitle: "Stock စီမံခန့်ခွဲရန်",
          navTitle2: "အော်ဒါစီမံခန့်ခွဲရန်",
          navTitle3: "Live လွှင့်ရောင်းရန်",
        },
      },
    },
  });
