import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const language = [
  { code: "en", lang: "English" },
  { code: "mm", lang: "မြန်မာ" },
];

function LanguageSelecter() {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div>
        {language.map((lang) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // marginLeft: "30px",
            }}
            key={lang.code}
          >
            <Button
              variant="contained"
              sx={{ my: 1, width: "100px" }}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.lang}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelecter;
