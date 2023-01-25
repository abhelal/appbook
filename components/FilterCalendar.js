import { useState, useEffect } from "react";

export default function Calendar({
  openCalendar,
  setOpenCalendar,
  initialDate,
  setSelectedDate,
  setShowFiltered,
}) {
  const dayName = ["S", "M", "T", "W", "T", "F", "S"];
  const [calendar, setCalendar] = useState([]);
  const [calendarTime, setCalendarTime] = useState(initialDate);

  useEffect(() => {
    const startDay = calendarTime.clone().startOf("month").startOf("week");
    const endDay = calendarTime.clone().endOf("month").startOf("week");
    let newEndDay;
    const showingMonth = [];
    const day = startDay.clone().subtract(1, "day");

    if (endDay.format("DD") < 30) {
      newEndDay = endDay.add(1, "week");
    } else {
      newEndDay = endDay;
    }

    while (day.isBefore(newEndDay, "day")) {
      showingMonth.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    setCalendar(showingMonth);
  }, [calendarTime]);

  const onSubmitDate = () => {
    setSelectedDate(calendarTime);
    setOpenCalendar(false);
    setShowFiltered(true);
  };

  return (
    <>
      {openCalendar && (
        <div className="absolute inset-0 bg-gray-400 bg-opacity-70 z-40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-md w-full h-full md:max-h-sm py-2">
              <div className="text-center text-md font-semibold text-primary-500">
                {calendarTime.format("YYYY")}
              </div>
              <div className="text-center text-xs text-primary-500">
                {calendarTime.format("ddd")}, {calendarTime.format("MMM")}{" "}
                {calendarTime.format("D")}
              </div>
              <div className="relative flex flex-col w-full">
                <div className="flex w-full justify-evenly py-2 text-xs text-gray-700 font-semibold">
                  {dayName.map((d, didx) => (
                    <div
                      key={didx}
                      className="flex justify-center items-center w-10 h-4"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                {calendar.map((week, idx) => (
                  <div key={idx} className="flex">
                    {week.map((day, idx) => (
                      <div
                        key={idx}
                        onClick={() => setCalendarTime(day)}
                        className="flex w-full justify-evenly py-0.5 text-xs"
                      >
                        <button
                          className={`${
                            calendarTime.isSame(day, "day")
                              ? "bg-primary-400"
                              : ""
                          } text-gray-500 flex justify-center items-center w-5 h-5 rounded-full`}
                        >
                          {day.format("D").toString()}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button
                onClick={() => onSubmitDate()}
                className="bg-primary-500 text-white rounded shadow-sm px-12 py-1 mt-3"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
