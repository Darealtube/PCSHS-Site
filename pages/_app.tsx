import type { AppProps } from "next/app";
import AppWrap from "../Components/AppWrap";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "next-auth/client";

const theme = createTheme();

theme.typography.h3 = {
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppWrap>
            <Component {...pageProps} />
          </AppWrap>
        </ThemeProvider>
      </Provider>
    </>
  );
}
export default MyApp;
