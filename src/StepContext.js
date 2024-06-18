import React, { createContext, useState } from "react";

export const MultiStepContext = createContext();

export default function StepContextProvider(props) {
  const [currentStep, setStep] = useState(1);

  return (
    <MultiStepContext.Provider value={{ currentStep, setStep }}>
      {props.children}
    </MultiStepContext.Provider>
  );
}
