import {
  Drawer,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const LatestAnnouncements = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const drawerWidth = tablet ? "40%" : "24%";

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
        <Typography align="center" variant="h5">
          Latest Announcements
        </Typography>
      </Container>
    </Drawer>
  );
};

export default LatestAnnouncements;
