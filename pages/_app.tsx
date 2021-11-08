import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";

const theme = createTheme();

/* theme.typography.h3 = {
  fontSize: "1.6rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.only("md")]: {
    fontSize: "1.6rem",
  },
  "@media all and (min-width: 1215px)": {
    fontSize: "2.4rem",
  },
};

theme.typography.h1 = {
  fontSize: "3rem",
  [theme.breakpoints.only("xs")]: {
    fontSize: "2.8rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.8rem",
  [theme.breakpoints.only("xs")]: {
    fontSize: "2.5rem",
  },
}; */

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
