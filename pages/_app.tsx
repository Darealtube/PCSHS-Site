import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap/AppWrap";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import "../public/nprogress.css";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import React, { useEffect } from "react";
import { start, done } from "nprogress";
import "../styles/global.css";
import ErrorProvider from "../Components/ErrorProvider";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import "@fontsource/inconsolata";

let theme = createTheme({
  typography: { fontFamily: "Inconsolata, monospace" },
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: { "&.Mui-selected": { backgroundColor: "#ffe8d6" } },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
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
