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

const AppWrap = ({ children }: { children: ReactChild }) => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
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
      {!tablet && !mobile && <PromotionBar />}
      <Box className={styles.Main}>
        <Container
          sx={{
            marginTop: "80px",
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default AppWrap;
