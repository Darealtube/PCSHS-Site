import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import React from "react";
import "../styles/global.css";
import ErrorProvider from "../Components/ErrorProvider";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorProvider>
            <SWRConfig value={{ fetcher }}>
              <AppWrap>
                <Component {...pageProps} />
              </AppWrap>
            </SWRConfig>
          </ErrorProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
export default MyApp;
