import { Container, Fade, Grid, Grow, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import VisibilitySensor from "react-visibility-sensor";
import PSAT from "../../public/pcshsPictures/PSATest.jpg";
import Review from "../../public/pcshsPictures/review.jpg";
import Image from "next/image";
import Procedure from "../../Components/Apply/Procedure";
import PSATable from "../../Components/Apply/PSATable";

const ApplyProcess = () => {
  return (
    <>
      <Head>
        <title>PCSHS Admissions</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" height="100%">
        <Container>
          <Grid container spacing={2}>
            <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <>
                  <Fade timeout={1500} in={isVisible}>
                    <Grid item xs={12} xl={6}>
                      <Image
                        src={PSAT}
                        placeholder="blur"
                        width={1200}
                        height={800}
                        alt="PSAT Image"
                      />
                    </Grid>
                  </Fade>
                  <Grow timeout={1000} in={isVisible}>
                    <Grid
                      item
                      xs={12}
                      xl={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h3" align="center" gutterBottom>
                        PSAT Online
                      </Typography>
                      <Typography paragraph align="center" variant="h5">
                        Pasig Science Admission Test (PSAT) Online is a
                        web-based assessment that aims to measure the aptitude
                        of students in various areas such as verbal,
                        mathematical, analytical, and scientific thinking. This
                        test was also designed to measure their ability to
                        perform well in the future under a science-oriented
                        curriculum.
                      </Typography>
                    </Grid>
                  </Grow>
                </>
              )}
            </VisibilitySensor>

            <Grid item xs={12} mt={8}>
              <PSATable />
            </Grid>
          </Grid>
        </Container>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Box
              sx={{ backgroundColor: "#03045e" }}
              pt={8}
              pb={8}
              mt={16}
              mb={16}
            >
              <Zoom in={isVisible} timeout={200}>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "white",
                  }}
                >
                  <Typography variant="h5" align="center" gutterBottom mt={4}>
                    GETTING READY FOR PSAT ONLINE
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom mt={4}>
                    All students and parents are required to attend the general
                    orientation to be conducted virtually. In this orientation,
                    you will be provided with access to the examination platform
                    and a step-by-step guide on how to take the admission test
                    online. Make sure to follow our{" "}
                    <a
                      href="https://www.facebook.com/pcshs.edu"
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{ color: "gold" }}
                    >
                      official Facebook page
                    </a>{" "}
                    for schedules and other updates.
                  </Typography>
                </Container>
              </Zoom>
            </Box>
          )}
        </VisibilitySensor>

        <Container>
          <Procedure image={Review}>
            <Typography variant="h3" align="center" gutterBottom>
              Before the Test
            </Typography>
            <Typography paragraph align="center" variant="h5">
              Prepare for the test by ensuring that you have proper internet
              connection, being in a clean and peaceful environment, and making
              sure that the equipments needed to take the exam are ready to go.
              When you are ready, go to an online video conferencing platform,
              then stream and record your screen while taking the test.
            </Typography>
          </Procedure>

          <Procedure direction="row-reverse" image={Review}>
            <Typography variant="h3" align="center" gutterBottom>
              During the Test
            </Typography>
            <Typography paragraph align="center" variant="h5">
              The 70-question multiple-choice exam must be completed in under
              110 minutes. Make sure to observe honesty in taking the exam, as
              cheating will lead to an automatic disqualification. The exam is
              confidential and it cannot be reproduced in any manner at any
              time.
              <br />
              <br />
              Take the test here.
            </Typography>
          </Procedure>

          <Procedure image={Review}>
            <Typography variant="h3" align="center" gutterBottom>
              Submit the Test
            </Typography>
            <Typography paragraph align="center" variant="h5">
              Save the recording and submit through{" "}
              <a
                href="https://bit.ly/psat2021"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "gold", textDecoration: "none" }}
              >
                this link
              </a>
              . <br />
              Your filename should follow this format: Last Name_First
              Name_Grade Level (e.g. Gomez_Richard_G7).
            </Typography>
          </Procedure>
        </Container>

        <Box sx={{ backgroundColor: "#03045e" }} pt={8} pb={8}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom mt={4}>
              Support
            </Typography>
            <Typography variant="h5" align="center" gutterBottom mt={4}>
              If you have any questions, please contact us at 628-2226 or
              728-7041 or send us an email at admission.pcshs@gmail.com.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ApplyProcess;
