import {
  Drawer,
  Container,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import useSWR from "swr";
import styles from "../../styles/Announcement.module.css";

const CardSkeleton = () => {
  return (
    <>
      <Box sx={{ width: "100%", my: 5 }}>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
      </Box>
      <Box sx={{ width: "100%", my: 5 }}>
        <Skeleton variant="rectangular" width="100%" height="20vh" />
      </Box>
    </>
  );
};

const PromotionBar = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const drawerWidth = tablet ? "40%" : "24%";
  const { data, error } = useSWR("/api/promotion");

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
      anchor="right"
    >
      <Container className={styles.promoteBar}>
        {data ? (
          <video
            src={data.promoVid}
            autoPlay
            loop
            muted
            width="100%"
            height={200}
            controls
          />
        ) : (
          <Box sx={{ width: "100%", my: 5 }}>
            <Skeleton variant="rectangular" width="100%" height="20vh" />
          </Box>
        )}

        <Typography variant="h5" gutterBottom align="center">
          PCSHS Environment
        </Typography>

        {data ? (
          data.environment.map((picture: string) => (
            <Box
              position="relative"
              width="100%"
              height="20vh"
              marginBottom={4}
              key={picture}
            >
              <Image
                src={picture}
                alt="PCSHS Facility"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          ))
        ) : (
          <CardSkeleton />
        )}
      </Container>
    </Drawer>
  );
};

export default PromotionBar;
