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
          onboarding:
            "Login into live code and manage your live sales with easy-peasy features to create endless profits without much effort..",
          loginBtn: "Login To LiveCode",
          loginFB: " Connect With Facebook Admin Account to Use Live Code",
          stepOne: "Set Up Your Shop In Live Code",
          stepOneDes:
            "You can change the shop information later in the profile setting > security feature",
          navTitle: "Stock Management",
          navTitle3: "Order Management",
          navTitle2: "Live Sale",
        },
      },
      mm: {
        translation: {
          greeting: "မင်္ဂလာပါ",
          onboarding: "Live Code သို့ဝင်ရောက်ပါ",
          loginBtn: "Live Code သို့ဝင်ရောက်မည်",
          loginFB:
            "Live Code ကိုအသုံးပြုရန်အတွက် သင်၏ Facebook Account  နှင့်ချိတ်ဆက်ပါ",
          stepOne: "သင့်ဆိုင်၏ အချက်အလက်များကို ထည့်သွင်းပါ",
          stepOneDes:
            "သင်ဆိုင်၏ အချက်အလက်များကို နောင်တွင် setting  > shop info တွင် ပြောင်းလဲနိုင်ပါသည်",
          navTitle: "Stock စီမံခန့်ခွဲရန်",
          navTitle3: "အော်ဒါစီမံခန့်ခွဲရန်",
          navTitle2: "Live လွှင့်ရောင်းရန်",
        },
      },
    },
  });
