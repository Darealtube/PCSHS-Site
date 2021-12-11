import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import React, { useState } from "react";
import "../styles/global.css";
import dynamic from "next/dynamic";

const DynamicError = dynamic(() => import("../Components/ErrorSnack"));

const theme = createTheme({
  typography: {
    fontFamily: "Times New Roman, Times, serif",
  },
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#ffe8d6",
          },
        },
      },
    },
  },
});
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ErrorHandler = (message: string) => void;

export const ErrorContext = React.createContext<ErrorHandler>((message) =>
  console.log(message)
);

function MyApp({ Component, pageProps }: AppProps) {
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
    <>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorContext.Provider value={handleError}>
            <SWRConfig value={{ fetcher }}>
              <AppWrap>
                <Component {...pageProps} />
              </AppWrap>
              <DynamicError
                open={error.hasError}
                error={error.errMessage}
                handleClose={handleErrorClose}
              />
            </SWRConfig>
          </ErrorContext.Provider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
export default MyApp;
