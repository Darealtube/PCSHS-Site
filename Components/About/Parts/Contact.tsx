import {
  Typography,
  Grid,
  Slide,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import CallIcon from "@mui/icons-material/Call";
import RoomIcon from "@mui/icons-material/Room";
import VisibilitySensor from "react-visibility-sensor";
import styles from "../../../styles/About.module.css";

const Contacts = [
  {
    icon: <TwitterIcon fontSize="large" sx={{ color: "#e9c46a", mr: 2 }} />,
    contact: "@ssgpasigsci",
  },
  {
    icon: <EmailIcon fontSize="large" sx={{ color: "#e9c46a", mr: 2 }} />,
    contact: "pasigcitysciencehs05@gmail.com",
  },
  {
    icon: <FacebookIcon fontSize="large" sx={{ color: "#e9c46a", mr: 2 }} />,
    contact: "https://www.facebook.com/pcshs.edu",
  },
  {
    icon: <CallIcon fontSize="large" sx={{ color: "#e9c46a", mr: 2 }} />,
    contact: "628-2177 / 628-2226 / 83548658",
  },
  {
    icon: <RoomIcon fontSize="large" sx={{ color: "#e9c46a", mr: 2 }} />,
    contact: "RAVE Park, Maybunga, Pasig City",
  },
];

const ContactUs = () => {
  const theme = useTheme();
  const smCP = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box className={styles.contactUs} id="contacts">
        <Typography variant="h2" gutterBottom color="#e9c46a" mt={8}>
          Contact Us
        </Typography>

        <VisibilitySensor partialVisibility>
          {({ isVisible }: { isVisible: boolean }) => (
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {Contacts.map(({ contact, icon }) => (
                <Slide
                  direction="left"
                  in={isVisible}
                  key={contact}
                  timeout={1000}
                >
                  <Grid item xs={12} md={6}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      marginBottom={4}
                      key={contact}
                    >
                      {icon}
                      <Typography
                        variant={smCP ? "body1" : "h5"}
                        align="center"
                        gutterBottom
                        color="#e9c46a"
                      >
                        {contact}
                      </Typography>
                    </Box>
                  </Grid>
                </Slide>
              ))}
            </Grid>
          )}
        </VisibilitySensor>
        <Typography align="center" variant="body1" color="white" mt={4}>
          ©2021 by Pasig City Science High School
        </Typography>
      </Box>
    </>
  );
};

export default ContactUs;
