import {
  Drawer,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const LatestAnnouncements = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("lg"));
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = mobile ? null : tablet ? "40%" : "24%";
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

      <Paper sx={{ position: "sticky", bottom: 0, width: "100%" }}>
        <Typography align="center" variant="h6">
          Contact Us
        </Typography>
        <Typography align="center">
          Email: pasigcitysciencehs05@gmail.com
        </Typography>
        <Typography align="center">Landline: 83548658</Typography>
      </Paper>
    </Drawer>
  );
};

export default LatestAnnouncements;
