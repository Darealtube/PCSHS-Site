import {
  AppBar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Container,
} from "@mui/material";
import { ReactChild } from "react";
import Image from "next/image";
import PCSHSLogo from "../public/pcshslogo.png";
import LatestAnnouncements from "./Drawers/Latest";
import styles from "../styles/AppWrap.module.css";
import AppOptions from "./AppOptions";
import PromotionBar from "./Drawers/Promote";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";

const AppWrap = ({ children }: { children: ReactChild }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const desktop = useMediaQuery(theme.breakpoints.only("xl"));
  return (
    <>
      <AppBar position="fixed" className={styles.AppBar}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            marginLeft: "8px",
          }}
        >
          <Image
            src={PCSHSLogo}
            alt={"PCSHS Logo"}
            placeholder="blur"
            width={64}
            height={64}
          />
          <Typography variant="h5">
            {mobile ? "PCSHS" : "Pasig City Science Highschool"}
          </Typography>
        </Box>
        <AppOptions />
      </AppBar>
      {!mobile && <LatestAnnouncements />}
      {desktop && <PromotionBar />}
      <Box className={styles.Main} id="scrollable">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Container
            sx={{
              marginTop: "80px",
            }}
          >
            {children}
          </Container>
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default AppWrap;
