import {
  Paper,
  IconButton,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Dispatch } from "react";
import {
  CalendarState,
  CalendarAction,
} from "../../utils/Reducers/calendarReducer";
import { Event } from "../../types/PrismaTypes";

const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type MobileProps = {
  calendar: CalendarState;
  dispatch: Dispatch<CalendarAction>;
  day: Event;
};

const MobileCalendar = ({ calendar, dispatch, day }: MobileProps) => {
  const handleNextDay = () => {
    dispatch({ type: "NEXT_DAY" });
  };
  const handlePreviousDay = () => {
    dispatch({ type: "PREVIOUS_DAY" });
  };

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          height: "80vh",
          marginTop: "24px",
          backgroundColor: day.id ? "#0a9396" : "inherit",
        }}
      >
        <Box
          display="flex"
          border="1px solid grey"
          sx={{ backgroundColor: "#0466C8" }}
        >
          <IconButton size="large" onClick={handlePreviousDay}>
            <NavigateBeforeIcon />
          </IconButton>
          <Typography
            align="center"
            variant="h2"
            sx={{ flexGrow: 1, wordBreak: "break-all" }}
          >
            {Days[calendar.dayofWeek]}
          </Typography>
          <IconButton
            size="large"
            sx={{ marginRight: "16px" }}
            onClick={handleNextDay}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <Typography variant="h4">{Months[calendar.month - 1]}</Typography>
          <Typography variant="h1" sx={{ marginTop: "32px" }}>
            {calendar.day}
          </Typography>

          {day.id && (
            <Container
              sx={{ overflow: "auto", height: "100%",  maxHeight: "100%" }}
            >
              <Typography variant="h6" gutterBottom align="center">
                {day.title}
              </Typography>
              <Typography variant="body1" paragraph align="center">
                {day.description}
              </Typography>
              <Typography variant="body1" paragraph align="center">
                {day.description}
              </Typography>
              <Typography variant="body1" paragraph align="center">
                {day.description}
              </Typography>
              <Typography variant="body1" paragraph align="center">
                {day.description}
              </Typography>
            </Container>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default MobileCalendar;
