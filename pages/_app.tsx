import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import React from "react";
import "../styles/global.css";

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
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig value={{ fetcher }}>
            <AppWrap>
              <Component {...pageProps} />
            </AppWrap>
          </SWRConfig>
        </ThemeProvider>
      </Provider>
    </>
  );
}
export default MyApp;
