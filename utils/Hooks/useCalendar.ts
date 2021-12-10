import dayjs from "dayjs";
import { useMemo, useReducer } from "react";
import useSWR from "swr";
import calendarReducer from "../Reducers/calendarReducer";
import { sortBy, unionBy } from "lodash";
import { Event } from "../../types/PrismaTypes";

const initCalendar = {
  day: dayjs().date(),
  dayofWeek: dayjs().day(),
  month: dayjs().month() + 1,
  year: dayjs().year(),
  dayStart: dayjs().startOf("month").day(),
  dayEnd: dayjs().endOf("month").day(),
  daysInMonth: dayjs().daysInMonth(),
};

const useCalendar = () => {
  const [calendar, dispatch] = useReducer(calendarReducer, initCalendar);
  const { data: events, mutate } = useSWR(
    `/api/event/getEvents?month=${calendar.month}&year=${calendar.year}`
  );

  const dayArray: Event[] = useMemo(() => {
    let array: Event[] = [];
    for (let i = 1; i <= calendar.daysInMonth; i++) {
      array.push({
        day: i,
        month: calendar.month,
        year: calendar.year,
        description: "",
        id: "",
        title: "",
      });
    }
    let daywithEvents = sortBy(unionBy(events, array, "day"), "day");
    return daywithEvents;
  }, [calendar, events]);

  return { calendar, dispatch, dayArray, events, mutate };
};

export default useCalendar;
