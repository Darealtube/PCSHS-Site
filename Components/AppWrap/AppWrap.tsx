import {
  AppBar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Container,
} from "@mui/material";
import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PCSHSLogo from "../../public/pcshslogo.png";
import LatestAnnouncements from "./Drawers/Latest";
import PCSHSMenu from "./Drawers/Menu";
import styles from "../../styles/AppWrap.module.css";
import AppOptions from "../AppOptions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AppWrap = ({ children }: { children: ReactNode }) => {
  const [openLatest, setOpenLatest] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLatest = () => {
    setOpenLatest(!openLatest);
  };

  return (
    <>
      <AppBar className={styles.appBar}>
        <Box className={styles.appBarLogoBox}>
          <Link href="/">
            <Box className={styles.appBarLogo}>
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

      <LatestAnnouncements open={openLatest} handleOpen={handleLatest} />
      <PCSHSMenu />
      <Box className={styles.main} id="scrollable">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className={styles.mainContainer}>{children}</Box>
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default AppWrap;
