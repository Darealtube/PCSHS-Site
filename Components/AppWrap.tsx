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
import Link from "next/link";
import PCSHSLogo from "../public/pcshslogo.png";
import LatestAnnouncements from "./Drawers/Latest";
import styles from "../styles/AppWrap.module.css";
import AppOptions from "./AppOptions";
import MenuBar from "./Drawers/Menu";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import dynamic from "next/dynamic";

const DynamicBottomNav = dynamic(() => import("./BottomMenu"));

const AppWrap = ({ children }: { children: ReactChild }) => {
  const theme = useTheme();
  const smMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const desktop = useMediaQuery(theme.breakpoints.only("xl"));
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          flexDirection: "row",
          zIndex: 10000,
          width: "100%",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            marginLeft: "8px",
          }}
        >
          <Link passHref href="/">
            <Box
              component="a"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "inherit",
                textDecoration: "none",
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
          </Link>
        </Box>
        <AppOptions />
      </AppBar>
      {!mobile && <LatestAnnouncements />}
      {desktop && <MenuBar />}
      <Box className={styles.main} id="scrollable">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Container
            sx={{
              marginTop: "80px",
            }}
          >
            {children}
          </Container>
          {smMobile && (
            <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
              <DynamicBottomNav />
            </Box>
          )}
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default AppWrap;
