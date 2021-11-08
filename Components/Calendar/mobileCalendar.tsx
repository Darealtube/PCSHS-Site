import {
  Paper,
  IconButton,
  Typography,
  Divider,
  Grid,
  Container,
  useMediaQuery,
  useTheme,
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
import styles from "../../styles/Calendar.module.css";
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
  const theme = useTheme();
  const noEvent = !day.id;
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const handleNextDay = () => {
    dispatch({ type: "NEXT_DAY" });
  };
  const handlePreviousDay = () => {
    dispatch({ type: "PREVIOUS_DAY" });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        display="flex"
        border="1px solid grey"
        sx={{ backgroundColor: "#0466C8", width: "100%" }}
      >
        <IconButton size="large" onClick={handlePreviousDay}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography align="center" variant="h2" className={styles.weekDay}>
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
        height="100%"
        width="100%"
        sx={{ backgroundColor: day.id ? "#429EA6" : "#ECEBE4" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Typography
            className={noEvent ? styles.month : styles.eventMonth}
            align="center"
          >
            {Months[calendar.month - 1]}
          </Typography>
          <Typography
            variant="h1"
            className={noEvent ? styles.day : styles.eventDay}
            align="center"
          >
            {calendar.day}
          </Typography>

          {day.id && (
            <Container>
              <Typography
                variant="h3"
                className={styles.eventTitle}
                gutterBottom
                align="center"
              >
                {day.title}
              </Typography>
              <Typography
                variant="body1"
                className={styles.eventDesc}
                paragraph
                align="center"
              >
                {day.description}
              </Typography>
            </Container>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MobileCalendar;
