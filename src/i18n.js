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
          stepTwo: "Set Up Your Auto Reply Message",
          stepThree: "Set Up Your Shop Receipt",
          stepOneDes:
            "You can change the shop information later in the profile setting > security feature",
          stepTwoDes:
            "You can change the shop information later in the profile setting > security feature",
          stepThreeDes:
            "You can change the shop information later in the profile setting > security feature",

          stepOneBtn: "Set Up Your Shop",
          stepTwoBtn: "Edit The Previous Step",
          stepTwoBtn2: "Continue the setup",
          steoThreeBtn: "Edit The Previous Step",
          steoThreeBtn2: "Create Your Shop",
          navTitle: "Stock Management",
          navTitle3: "Order Management",
          navTitle2: "Live Sale",
          shopFormLabelOne: "Shop Name",
          shopFormLabelTwo: "Email",
          shopFormLabelThree: "Phone",
          shopFormLabelFour: "Address",
          addStockBtn: "Add New Stock",
          remStockBtn: "Remove Stock",
          stkformlbelone: "Stock Name",
          stkformlbeltwo: "Price",
          stkformlbelthree: "Quantity",
          stkformlbelfour: "Live Sale Code",
          stkformlbelfive: "Unit",
          stkformlbelsix: "Image",
          stkformlbelseven: "Description",
          editbtn: "Update Stock",
          cancelbtn: "Cancel",
          editTitle: "Edit Stock",
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
          stepTwo: "Auto Reply Message ကိုပြင်ဆင်ပါ",
          stepThree: "ဆိုင်၏ Voucher ကိုပြင်ဆင်ပါ",
          stepOneDes:
            "သင်ဆိုင်၏ အချက်အလက်များကို နောင်တွင် setting  > shop info တွင် ပြောင်းလဲနိုင်ပါသည်",
          stepTwoDes:
            "Auto Reply Messageကို နောင်တွင် setting  >Auto Reply Message တွင် ပြောင်းလဲနိုင်ပါသည်",
          stepThreeDes:
            "Auto Reply Messageကို နောင်တွင် setting  >Auto Reply Message တွင် ပြောင်းလဲနိုင်ပါသည်",
          stepOneBtn: "ဆိုင်အချက်အလက်များကို ထည့်သွင်းမည်",
          stepTwoBtn: "နောက်သို့ပြန်သွားမည်",
          stepTwoBtn2: "Auto Reply Message ကိုပြင်ဆင်မည်",
          stepThreeBtn: "နောက်သို့ပြန်သွားမည်",
          stepThreeBtn2: "ဆိုင်အချက်အလက်များကို ထည့်သွင်းမည်",
          navTitle: "ကုန်ပစ္စည်း စီမံခန့်ခွဲခြင်း",
          navTitle2: "Live Sale ",
          navTitle3: "အော်ဒါ စီမံခန့်ခွဲခြင်း",
          shopFormLabelOne: "ဆိုင်နာမည်",
          shopFormLabelTwo: "Email လိပ်စာ",
          shopFormLabelThree: "ဖုန်းနံပါတ်",
          shopFormLabelFour: "ဆိုင်လိပ်စာ",
          addStockBtn: "ကုန်ပစ္စည်း အသစ်ထည့်မည်",
          remStockBtn: "ကုန်ပစ္စည်း ဖယ်ရှားမည်",
          stkformlbelone: "ကုန်ပစ္စည်းအမည်",
          stkformlbeltwo: "ဈေးနှုန်း",
          stkformlbelthree: "အရေအတွက်",
          stkformlbelfour: "Live Sale ကုဒ်",
          stkformlbelfive: "အတိုင်းအတာ (ယူနစ်)",
          stkformlbelsix: "ဓာတ်ပုံ",
          stkformlbelseven: "ကုန်ပစ္စည်း အသေးစိတ်",
          editbtn: "ပြင်ဆင်မည်",
          cancelbtn: "ပယ်ဖျက်မည်",
          editTitle: "အချက်အလက် ပြင်ဆင်မည်",
        },
      },
    },
  });
