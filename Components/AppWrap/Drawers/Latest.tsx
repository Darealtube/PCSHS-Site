import {
  Drawer,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import useAnnouncements from "../../../utils/Hooks/useAnnouncements";
import { flatten } from "lodash";
import AnnouncementList from "../Lists/AnnouncementList";

const LatestAnnouncements = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const desktop = useMediaQuery(theme.breakpoints.only("lg"));
  const drawerWidth = tablet || desktop ? "40%" : "24%";
  const { announcements, moreAnnouncements, noMore } = useAnnouncements({
    limit: 8,
    type: "apply",
  });

  if (mobile) {
    return (
      <SwipeableDrawer
        sx={{
          width: "90%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "90%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        PaperProps={{
          id: "drawerScrollable",
          sx: {
            backgroundImage: "url(/homebg.png)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          },
        }}
        onClose={handleOpen}
        onOpen={handleOpen}
        open={open}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backdropFilter: "blur(6px) brightness(90%)",
            width: "100%",
            zIndex: 99,
          }}
        >
          <Box
            height={120}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography align="center" variant="h5" gutterBottom>
              Latest Announcements
            </Typography>
          </Box>
        </Box>
        <AnnouncementList
          announcements={flatten(announcements)}
          noMore={noMore}
          moreAnnouncements={moreAnnouncements}
        />
      </SwipeableDrawer>
    );
  }

  return (
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
      anchor="left"
      PaperProps={{
        id: "drawerScrollable",
        sx: {
          backgroundImage: "url(/homebg.png)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
          overflow: "auto",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backdropFilter: "blur(6px) brightness(90%)",
          width: "100%",
          zIndex: 99,
        }}
      >
        <Box
          height={120}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Typography align="center" variant="h5" gutterBottom>
            Latest Announcements
          </Typography>
        </Box>
      </Box>
      <AnnouncementList
        announcements={flatten(announcements)}
        noMore={noMore}
        moreAnnouncements={moreAnnouncements}
      />
    </Drawer>
  );
};

export default LatestAnnouncements;
