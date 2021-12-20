import {
  Drawer,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Box,
  Skeleton,
  CircularProgress,
  SwipeableDrawer,
} from "@mui/material";
import React from "react";
import { CardAnnouncement } from "../../types/PrismaTypes";
import Announcement from "../AnnouncementCard";
import InfiniteScroll from "react-infinite-scroll-component";
import useAnnouncements from "../../utils/Hooks/useAnnouncements";
import { flatten } from "lodash";

const CardSkeleton = () => {
  return (
    <>
      <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
      </Box>
      <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
      </Box>
      <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
      </Box>
    </>
  );
};

type ListProps = {
  announcements: CardAnnouncement[];
  moreAnnouncements: () => void;
  noMore: boolean | undefined;
};

const AnnouncementList = ({
  announcements,
  moreAnnouncements,
  noMore,
}: ListProps) => {
  return (
    <InfiniteScroll
      next={moreAnnouncements}
      dataLength={announcements.length}
      loader={
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={2}
        >
          <CircularProgress color="inherit" />
        </Box>
      }
      hasMore={!noMore}
      scrollableTarget={"drawerScrollable"}
      scrollThreshold={0.9}
    >
      <Container sx={{ marginTop: "80px", width: "100%", height: "100%" }}>
        <Typography align="center" variant="h5" gutterBottom>
          Latest Announcements
        </Typography>
        {announcements &&
          announcements.map((announcement) => (
            <React.Fragment key={announcement.id}>
              <Announcement announcement={announcement} type="Apply" />
            </React.Fragment>
          ))}
      </Container>
    </InfiniteScroll>
  );
};

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
    limit: 10,
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
        {announcements ? (
          <AnnouncementList
            announcements={flatten(announcements)}
            noMore={noMore}
            moreAnnouncements={moreAnnouncements}
          />
        ) : (
          <CardSkeleton />
        )}
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
        },
      }}
    >
      {announcements ? (
        <AnnouncementList
          announcements={flatten(announcements)}
          noMore={noMore}
          moreAnnouncements={moreAnnouncements}
        />
      ) : (
        <CardSkeleton />
      )}
    </Drawer>
  );
};

export default LatestAnnouncements;
