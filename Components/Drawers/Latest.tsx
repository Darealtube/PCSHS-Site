import {
  Drawer,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Box,
  Skeleton,
} from "@mui/material";
import useSWR from "swr";
import { CardAnnouncement } from "../../types/PrismaTypes";
import Announcement from "../AnnouncementCard";

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

const LatestAnnouncements = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const desktop = useMediaQuery(theme.breakpoints.only("lg"));
  const drawerWidth = tablet || desktop ? "40%" : "24%";
  const { data, error } = useSWR("/api/announcement/applyAnnouncements", {
    revalidateOnFocus: false,
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
    >
      <Container sx={{ marginTop: "80px", width: "100%", height: "100%" }}>
        <Typography align="center" variant="h5" gutterBottom>
          Latest Announcements
        </Typography>

        {data ? (
          <>
            {data.map((announcement: CardAnnouncement) => (
              <Box key={announcement.header}>
                <Announcement announcement={announcement} type={"Apply"} />
              </Box>
            ))}
          </>
        ) : (
          <CardSkeleton />
        )}
      </Container>
    </Drawer>
  );
};

export default LatestAnnouncements;
