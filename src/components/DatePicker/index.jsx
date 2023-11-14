import "./styles.scss";
import { NAMES_BY_DAYS } from "../../utils/constants";

function getDaysInMonth(year, month) {
  const lastDay = new Date(year, month, 0).getDate(); // Récupère le dernier jour du mois spécifié
  return Array.from({ length: lastDay }, (_, index) => index + 1); // retourne un tableau ( partant de 1 jusqu'au dernier jour)
}

function getDayOfWeek(month, year) {
  const date = new Date(year + "-" + month);
  const dayOfWeekIndex = date.getDay();
  return dayOfWeekIndex;
}

function DatePicker() {
  const currentDate = new Date();
  console.log(currentDate.getDate());
  const presentYear = "2023";
  const presentMonth = "3";
  const daysInCurrentMonth = getDaysInMonth(presentYear, presentMonth);
  const daysInPreviousMonth = getDaysInMonth(presentYear, presentMonth - 1);
  const firstDayOfTheMonth = getDayOfWeek(presentMonth, presentYear);
  const maxArrayHeight =
    firstDayOfTheMonth + daysInCurrentMonth.length > 35 ? 42 : 35;
  //   console.log("FirstDayOfTheMonth : " + firstDayOfTheMonth);
  //   for (let i = 0; i < firstDayOfTheMonth; i++) {
  //     daysInCurrentMonth.unshift(0);
  //   }
  //   for (let i = daysInCurrentMonth.length; i < 35; i++) {
  //     daysInCurrentMonth.push(0);
  //   }

  return (
    <div>
      {/* {console.log("daysInPreviousMonth : " + daysInPreviousMonth)}
      {console.log("daysInCurrentMonth : " + daysInCurrentMonth)} */}

      <div className="calendar">
        <div className="calendar__navigation"></div>
        <div className="calendar__grid">
          {NAMES_BY_DAYS.EN.map((day) => {
            return (
              <div className="calendar__grid--dayName" key={day}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="calendar__grid">
          {Array.from({ length: firstDayOfTheMonth }).map((_, index) => {
            return (
              <div
                className="calendar__grid--day-empty"
                key={"previous-" + index}
              >
                {
                  daysInPreviousMonth[
                    daysInPreviousMonth.length - (firstDayOfTheMonth - index)
                  ]
                }
              </div>
            );
          })}
          {daysInCurrentMonth.map((day) => {
            return (
              <div
                className={
                  currentDate.getDate() === day
                    ? "calendar__grid--actual-day"
                    : "calendar__grid--day"
                }
                key={"actual-" + day}
              >
                {day}
              </div>
            );
          })}
          {/* {console.log("max height : " + maxArrayHeight)}
          {console.log(
            "Last days : " +
              (maxArrayHeight -
                (firstDayOfTheMonth + daysInCurrentMonth.length))
          )} */}
          {Array.from({
            length:
              maxArrayHeight - (firstDayOfTheMonth + daysInCurrentMonth.length),
          }).map((_, index) => {
            return (
              <div className="calendar__grid--day-empty" key={"next-" + index}>
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
