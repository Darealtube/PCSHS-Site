import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DomainIcon from "@mui/icons-material/Domain";
import PeopleIcon from "@mui/icons-material/People";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const History = () => {
  const theme = useTheme();
  const smCP = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Year 2004
      </Typography>
      <Timeline position="alternate" sx={{ paddingBottom: "64px" }}>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="white"
          >
            October 7, 2004
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="success">
              <FmdGoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            {!smCP ? (
              <Typography variant="h5" paragraph>
                Pasig City Science Highschool was founded with the support and
                determination of former Mayor Soledad C. Eusebio, Hon. Mayor
                Vicente P. Eusebio, and the members of the City Council.
              </Typography>
            ) : (
              <Typography variant="body1" paragraph>
                PCSHS was founded with the support of
                the former mayor and the City Council.
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="white"
          >
            Year 2005
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <PeopleIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            {!smCP ? (
              <Typography variant="h5" paragraph>
                Faculties enrolled, entrance exams administered, grading
                standards set, and scholarship programs.
              </Typography>
            ) : (
              <Typography variant="body1" paragraph>
                Faculties and school systems were set.
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="white"
          >
            Summer of 2006
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <DomainIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            {!smCP ? (
              <Typography variant="h5" paragraph>
                Upgraded facilities, establishing the dream school, and the
                creation of the PCSHS Logo and Hymn.
              </Typography>
            ) : (
              <Typography variant="body1" paragraph>
                Facilities revamped and the PCSHS Logo and Hymn was born.
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
};

export default History;
