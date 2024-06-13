import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const language = [
  { code: "en", lang: "English" },
  { code: "mm", lang: "မြန်မာ" },
];

function LanguageSelecter() {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("mm");
      localStorage.setItem("lang", "mm");
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("lang", "en");
    }
  };

  return (
    <div>
      <div>
        <Button variant="contained" fullWidth onClick={changeLanguage}>
          Change Language
        </Button>
      </div>
    </div>
  );
}

export default LanguageSelecter;
