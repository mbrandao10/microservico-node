import {
  getToday,
  getNow,
  addMinutesDateTime,
  diffDateTimeInMinutes,
  dataTimeBetween
} from "@/util/date";

describe("date.ts", () => {
  it("getToday should return the current date in yyyy-MM-dd format", () => {
    const today = getToday();
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    expect(today).toMatch(regex);
  });

  it("getNow should return the current date and time in Date format", () => {
    const now = getNow();
    expect(now).toBeInstanceOf(Date);
  });

  it("addMinutesDateTime should correctly add minutes to a given date", () => {
    const date = new Date("2023-10-09T12:00:00");
    const minutesToAdd = 30;
    const result = addMinutesDateTime({ date, minutes: minutesToAdd });

    expect(result).toBeInstanceOf(Date);
    expect(result.getMinutes()).toBe(date.getMinutes() + minutesToAdd);
  });

  it("diffDateTimeInMinutes should correctly calculate the difference in minutes between two dates", () => {
    const dateRight = new Date("2023-10-09T12:00:00");
    const dateLeft = new Date("2023-10-09T12:45:00");
    const diffInMinutes = diffDateTimeInMinutes({ dateLeft, dateRight });

    expect(diffInMinutes).toBe(45);
  });

  it("dataTimeBetween should return true if dateLeft is after dateRight", () => {
    const dateLeft = new Date("2023-10-09T12:00:00");
    const dateRight = new Date("2023-10-09T12:45:00");
    const result = dataTimeBetween({ dateLeft, dateRight });

    expect(result).toBe(false);
  });
});
