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
import { Session } from "next-auth";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    h1: { fontWeight: 1200 },
    h2: { fontWeight: 1000 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 600 },
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

interface PageProps {
  session?: Session | null;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  return (
    <>
      <SessionProvider session={session}>
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
