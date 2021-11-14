import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import { RateLimiter } from "limiter";
import React from "react";

const limiter = new RateLimiter({
  tokensPerInterval: 150,
  interval: "hour",
});

export const rateLimit = async () => {
  const remainingRequests = await limiter.removeTokens(1);
  return remainingRequests;
};

const theme = createTheme();
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
