import { addDays, addMinutes, differenceInMinutes, format } from "date-fns";

export const getToday = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getNow = (): Date => {
  return new Date(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
};

type AddMinutesDateTimeType = {
  date: Date;
  minutes: number;
};

export const addMinutesDateTime = ({
  date,
  minutes
}: AddMinutesDateTimeType): Date => {
  return addMinutes(date, minutes);
};

type DateTimeInMinutesType = {
  dateLeft: Date;
  dateRight: Date;
};
export const diffDateTimeInMinutes = ({
  dateLeft,
  dateRight
}: DateTimeInMinutesType): number => {
  return differenceInMinutes(dateLeft, dateRight);
};

export const dataTimeBetween = ({
  dateLeft,
  dateRight
}: DateTimeInMinutesType): boolean => {
  return diffDateTimeInMinutes({ dateLeft, dateRight }) > 0;
};

export const zeroSeconds = (date: Date): Date => {
  return new Date(format(new Date(date), "yyyy-MM-dd HH:mm:00"));
};

export const addDaysToDate = ({
  date,
  days
}: {
  date: Date;
  days: number;
}): Date => {
  return addDays(date, days);
};
