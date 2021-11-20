import { Typography } from "@mui/material";
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
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Year 2004
      </Typography>
      <Timeline position="alternate" sx={{ marginBottom: "64px" }}>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="text.secondary"
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
            <Typography variant="h5" component="span">
              Founding
            </Typography>
            <Typography variant="h6" paragraph>
              Pasig City Science Highschool was founded with the support and
              determination of former Mayor Soledad C. Eusebio, Hon. Mayor
              Vicente P. Eusebio, and the members of the City Council.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
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
            <Typography variant="h5" component="span">
              School Systems
            </Typography>
            <Typography variant="h6" paragraph>
              Faculties enrolled, entrance exams administered, grading standards
              set, and scholarship programs.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
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
            <Typography variant="h5" component="span">
              General Improvements
            </Typography>
            <Typography variant="h6" paragraph>
              Upgraded facilities, establishing the dream school, and the
              creation of the PCSHS Logo and Hymn.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
};

export default History;
