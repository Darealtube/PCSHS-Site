import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "../public/nprogress.css";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import React, { useEffect } from "react";
import { start, done } from "nprogress";
import "../styles/global.css";
import ErrorProvider from "../Components/ErrorProvider";
import { useRouter } from "next/router";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    h1: {
      fontWeight: 1200,
    },
    h2: {
      fontWeight: 1000,
    },
    h3: {
      fontWeight: 800,
    },
    h4: {
      fontWeight: 600,
    },
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
const handleRouteStart = () => {
  start();
};
const handleRouteEnd = () => {
  done();
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteEnd);
    router.events.on("routeChangeError", handleRouteEnd);
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteEnd);
      router.events.off("routeChangeError", handleRouteEnd);
    };
  }, []);

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
