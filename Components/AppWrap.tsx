import {
  AppBar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Container,
} from "@mui/material";
import { ReactChild, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PCSHSLogo from "../public/pcshslogo.png";
import LatestAnnouncements from "./Drawers/Latest";
import styles from "../styles/AppWrap.module.css";
import AppOptions from "./AppOptions";
import MenuBar from "./Drawers/Menu";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { useRouter } from "next/dist/client/router";

const AppWrap = ({ children }: { children: ReactChild }) => {
  const [openLatest, setOpenLatest] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const aboutPage = router.pathname === "/about";
  const applyPage = router.pathname.startsWith("/apply");

  const handleLatest = () => {
    setOpenLatest(!openLatest);
  };

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
          backgroundImage: "url(/appbar.png)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
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
      {aboutPage ? (
        <>
          <Box
            sx={{
              marginTop: "60px",
              color: "white",
            }}
          >
            {children}
          </Box>
        </>
      ) : applyPage ? (
        <>
          <LatestAnnouncements open={openLatest} handleOpen={handleLatest} />
          <Box className={styles.applyMain}>
            <Box
              sx={{
                marginTop: "80px",
                backgroundImage: "url(/homebg.png)",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                height: "max-content",
              }}
            >
              {children}
            </Box>
          </Box>
        </>
      ) : (
        <>
          <LatestAnnouncements open={openLatest} handleOpen={handleLatest} />
          <MenuBar />
          <Box className={styles.main} id="scrollable">
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Container
                sx={{
                  marginTop: "80px",
                  backdropFilter: "blur(4px)",
                  height: "max-content",
                }}
              >
                {children}
              </Container>
            </LocalizationProvider>
          </Box>
        </>
      )}
    </>
  );
};

export default AppWrap;
