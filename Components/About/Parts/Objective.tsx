import {
  Typography,
  Grow,
  Grid,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";
import StudentValues from "../../../public/pcshsPictures/valuespcshs.jpg";
import HarnessStudents from "../../../public/pcshsPictures/enhanceArtpcshs.jpg";
import DeservingStudents from "../../../public/pcshsPictures/deservingpcshs.jpg";
import EmphasizeStandards from "../../../public/pcshsPictures/emphasizestandardspcshs.jpg";
import Facilities from "../../../public/pcshsPictures/pcshsenvironment.png";
import Image from "next/image";
import VisibilitySensor from "react-visibility-sensor";

const ObjectiveList = [
  {
    image: StudentValues,
    objective: `To inculcate among the students the values and virtues in life
      necessary in their interrelationships with selves, others,
      country, and God.`,
  },
  {
    image: EmphasizeStandards,
    objective: `To emphasize high standards of learning and high levels of
    learning skills such as critical and creative thinking and
    problem solving.`,
  },
  {
    image: Facilities,
    objective: `To provide state-of-the-art facilities that enhance
      interactive and hands-on learning experiences.`,
  },
  {
    image: HarnessStudents,
    objective: `To harness to the fullest the artistic, athletic, managerial
      and leadership skills of the students.`,
  },
  {
    image: DeservingStudents,
    objective: "To offer scholarship grants to deserving, gifted students.",
  },
];

const Objectives = () => {
  return (
    <Grid
      container
      spacing={8}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "120px",
      }}
    >
      {ObjectiveList.map(({ objective, image }) => (
        <VisibilitySensor partialVisibility key={objective}>
          {({ isVisible }) => (
            <Grow in={isVisible} timeout={1200}>
              <Grid item xs={12} md={6}>
                <Card elevation={16}>
                  <CardMedia
                    sx={{
                      position: "relative",
                      height: "32vh",
                      width: "100%",
                    }}
                  >
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      alt={"Picture of an objective"}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      {objective}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          )}
        </VisibilitySensor>
      ))}
    </Grid>
  );
};

export default Objectives;
