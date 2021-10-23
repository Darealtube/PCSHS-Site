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
import { Announcement as AnnouncementType } from "../../types/PrismaTypes";
import Announcement from "../Announcement";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CardSkeleton = () => {
  return (
    <>
      <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
        <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
            <Skeleton width="100%" />
            <Skeleton width="60%" />
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
      <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
        <Box display="flex" alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Box display="flex" flexDirection="column">
            <Skeleton width={"24vw"} />
            <Skeleton width={"8vw"} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
    </>
  );
};

const LatestAnnouncements = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const drawerWidth = tablet ? "40%" : "24%";
  const { data, error } = useSWR("/api/applyAnnouncements", fetcher);

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
            {data.map((announcement: AnnouncementType) => (
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
