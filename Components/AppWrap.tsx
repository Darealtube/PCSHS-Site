import {
  AppBar,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactChild } from "react";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import Image from "next/image";
import PCSHSLogo from "../public/pcshslogo.png";
import LatestAnnouncements from "./Drawers/Latest";

const AppWrap = ({ children }: { children: ReactChild }) => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("lg"));
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = mobile ? null : tablet ? "40%" : "24%";
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          display: "flex",
          flexDirection: "row",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Box sx={{ display: "flex", flexGrow: 1, width: drawerWidth }}>
          <IconButton size="large">
            <InfoIcon />
          </IconButton>
          <IconButton size="large">
            <EventIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
          <Image
            src={PCSHSLogo}
            alt={"PCSHS Logo"}
            placeholder="blur"
            width={64}
            height={64}
          />
          <Typography variant="h3">Pasig City Science Highschool</Typography>
        </Box>

        <Box sx={{ width: drawerWidth }}>
          <IconButton size="large">
            <PersonIcon />
          </IconButton>
        </Box>
      </AppBar>
      <LatestAnnouncements />
      {!tablet && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        ></Drawer>
      )}
      {children}
    </>
  );
};

export default AppWrap;
