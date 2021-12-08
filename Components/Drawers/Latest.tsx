import {
  Drawer,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Box,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { CardAnnouncement } from "../../types/PrismaTypes";
import Announcement from "../AnnouncementCard";
import InfiniteScroll from "react-infinite-scroll-component";
import useAnnouncements from "../../utils/useAnnouncements";
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

const LatestAnnouncements = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const desktop = useMediaQuery(theme.breakpoints.only("lg"));
  const drawerWidth = tablet || desktop ? "40%" : "24%";
  const { announcements, moreAnnouncements, noMore } = useAnnouncements({
    limit: 10,
    type: "apply",
  });

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
