import React, { useState } from "react";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

const DynamicError = dynamic(() => import("../Components/ErrorSnack"));
type ErrorHandler = (message: string) => void;

export const ErrorContext = React.createContext<ErrorHandler>((message) =>
  console.log(message)
);

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState({
    hasError: false,
    errMessage: "",
  });

  const handleError = (message: string) => {
    setError({
      hasError: true,
      errMessage: message,
    });
  };

  const handleErrorClose = () => {
    setError({
      hasError: false,
      errMessage: "",
    });
  };
  return (
    <ErrorContext.Provider value={handleError}>
      {children}
      <DynamicError
        open={error.hasError}
        error={error.errMessage}
        handleClose={handleErrorClose}
      />
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
