import dayjs from "dayjs";

export type CalendarState = {
  day: number;
  dayofWeek: number;
  month: number;
  year: number;
  dayStart: number;
  dayEnd: number;
  daysInMonth: number;
};

type CalendarOptions =
  | "NEXT_MONTH"
  | "PREVIOUS_MONTH"
  | "NEXT_DAY"
  | "PREVIOUS_DAY"
  | "ADD EVENT"
  | "REMOVE EVENT";

export type CalendarAction = {
  type: CalendarOptions;
};

const calendarReducer = (
  state: CalendarState,
  action: CalendarAction
): CalendarState => {
  const isDecember = state.month == 12;
  const isJanuary = state.month == 1;
  const dayisEndofMonth = state.day == state.daysInMonth;
  const dayisEndofYear = state.month == 12 && state.day == 31;
  const dayNotEndofMonth = state.day < state.daysInMonth;
  const isEndofWeek = state.dayofWeek == 6;
  const dayisStartofMonth = state.day == 1;
  const dayisStartofYear = state.month == 1 && state.day == 1;
  const isStartofWeek = state.dayofWeek == 0;
  switch (action.type) {
    case "NEXT_MONTH":
      return {
        ...state,
        day: 1,
        dayofWeek: dayjs(`${state.year}-${state.month + 1}-01`)
          .startOf("month")
          .day(),
        month: isDecember ? 1 : state.month + 1,
        year: isDecember ? state.year + 1 : state.year,
        dayStart: dayjs(`${state.year}-${state.month + 1}-01`)
          .startOf("month")
          .day(),
        dayEnd: dayjs(`${state.year}-${state.month + 1}-01`)
          .endOf("month")
          .day(),
        daysInMonth: dayjs(`${state.year}-${state.month + 1}-01`).daysInMonth(),
      };
    case "PREVIOUS_MONTH":
      return {
        ...state,
        day: 1,
        dayofWeek: dayjs(`${state.year}-${state.month - 1}-01`)
          .startOf("month")
          .day(),
        month: isJanuary ? 12 : state.month - 1,
        year: isJanuary ? state.year - 1 : state.year,
        dayStart: dayjs(`${state.year}-${state.month - 1}-01`)
          .startOf("month")
          .day(),
        dayEnd: dayjs(`${state.year}-${state.month - 1}-01`)
          .endOf("month")
          .day(),
        daysInMonth: dayjs(`${state.year}-${state.month - 1}-01`).daysInMonth(),
      };
    case "NEXT_DAY":
      return {
        day: dayisEndofMonth ? 1 : state.day + 1,
        dayofWeek: isEndofWeek ? 0 : state.dayofWeek + 1,
        month:
          dayisEndofMonth && isDecember
            ? 1
            : dayNotEndofMonth
            ? state.month
            : state.month + 1,
        year: dayisEndofYear ? state.year + 1 : state.year,
        daysInMonth: dayjs(
          `${state.year}-${dayNotEndofMonth ? state.month : state.month + 1}-01`
        ).daysInMonth(),
        dayStart: dayjs(
          `${state.year}-${dayNotEndofMonth ? state.month : state.month + 1}-01`
        )
          .startOf("month")
          .day(),
        dayEnd: dayjs(
          `${state.year}-${dayNotEndofMonth ? state.month : state.month + 1}-01`
        )
          .endOf("month")
          .day(),
      };
    case "PREVIOUS_DAY":
      return {
        ...state,
        day: dayisStartofMonth
          ? dayjs(`${state.year}-${state.month - 1}-01`).daysInMonth()
          : state.day - 1,
        month:
          dayisStartofMonth && isJanuary
            ? 12
            : dayisStartofMonth
            ? state.month - 1
            : state.month,
        dayofWeek: isStartofWeek ? 6 : state.dayofWeek - 1,
        daysInMonth: dayjs(
          `${state.year}-${
            !dayisStartofMonth ? state.month : state.month - 1
          }-01`
        ).daysInMonth(),
        year: dayisStartofYear ? state.year - 1 : state.year,
        dayStart: dayjs(
          `${state.year}-${
            !dayisStartofMonth ? state.month : state.month - 1
          }-01`
        )
          .startOf("month")
          .day(),
        dayEnd: dayjs(
          `${state.year}-${
            !dayisStartofMonth ? state.month : state.month - 1
          }-01`
        )
          .endOf("month")
          .day(),
      };
    default:
      return state;
  }
};

export default calendarReducer;
