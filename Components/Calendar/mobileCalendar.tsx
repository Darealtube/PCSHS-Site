import { IconButton, Typography, Divider, Container, Box } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Dispatch, useState } from "react";
import {
  CalendarState,
  CalendarAction,
} from "../../utils/Reducers/calendarReducer";
import { Event } from "../../types/PrismaTypes";
import styles from "../../styles/Calendar.module.css";
import dynamic from "next/dynamic";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSession } from "next-auth/react";

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
  add: (newEvent: Event) => void;
  update: (newEvent: Event) => void;
  remove: (id: string) => void;
};

const DynamicAddEventDialog = dynamic(
  () => import("../../Components/Calendar/Dialogs/addEventDialog")
);
const DynamicRemoveEventDialog = dynamic(
  () => import("../../Components/Calendar/Dialogs/removeEventDialog")
);
const DynamicUpdateEventDialog = dynamic(
  () => import("../../Components/Calendar/Dialogs/updateEventDialog")
);

const MobileCalendar = ({
  calendar,
  dispatch,
  day,
  add,
  update,
  remove,
}: MobileProps) => {
  const { data: session } = useSession();
  const noEvent = !day.id;
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const handleNextDay = () => {
    dispatch({ type: "NEXT_DAY" });
  };
  const handlePreviousDay = () => {
    dispatch({ type: "PREVIOUS_DAY" });
  };

  const handleAddEvent = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddEvent = () => {
    setOpenAddDialog(false);
  };

  const handleRemoveEvent = () => {
    setOpenRemoveDialog(true);
  };

  const handleCloseRemoveEvent = () => {
    setOpenRemoveDialog(false);
  };

  const handleUpdateEvent = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateEvent = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <>
      <Container>
        <Box
          display="flex"
          border="1px solid grey"
          sx={{ backgroundColor: "#0466C8", width: "100%" }}
        >
          <IconButton size="large" onClick={handlePreviousDay}>
            <NavigateBeforeIcon />
          </IconButton>
          <Typography align="center" className={styles.weekDay}>
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
          overflow="auto"
        >
          <Box display="flex" marginTop={2} marginBottom={2}>
            {session?.role == "Government" && (
              <>
                <IconButton
                  size="small"
                  onClick={day.id ? handleRemoveEvent : handleAddEvent}
                  value={day.day}
                  id={day.id ? day.id : undefined}
                  sx={{ ml: 2 }}
                >
                  {day.id ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
                {day.id && (
                  <IconButton
                    size="small"
                    value={day.id ? day.id : undefined}
                    onClick={day.id ? handleUpdateEvent : undefined}
                    sx={{ ml: 2 }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>
          <Box className={styles.mobileMain}>
            <Typography
              className={noEvent ? styles.month : styles.eventMonth}
              align="center"
            >
              {Months[calendar.month - 1]}
            </Typography>
            <Typography
              className={noEvent ? styles.day : styles.eventDay}
              align="center"
            >
              {calendar.day}
            </Typography>

            {day.id && (
              <Container>
                <Typography
                  className={styles.eventTitle}
                  gutterBottom
                  align="center"
                >
                  {day.title}
                </Typography>
                <Typography
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

      {openAddDialog && (
        <DynamicAddEventDialog
          open={openAddDialog}
          handleClose={handleCloseAddEvent}
          handleMutate={add}
          day={day}
        />
      )}

      {openUpdateDialog && (
        <DynamicUpdateEventDialog
          open={openUpdateDialog}
          handleClose={handleCloseUpdateEvent}
          handleMutate={update}
          day={day}
        />
      )}

      {openRemoveDialog && (
        <DynamicRemoveEventDialog
          open={openRemoveDialog}
          handleClose={handleCloseRemoveEvent}
          handleDeleteMutate={remove}
          id={day.id}
        />
      )}
    </>
  );
};

export default MobileCalendar;
