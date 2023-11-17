import "./styles.scss";
import { NAMES_BY_DAYS, NAMES_BY_MONTH } from "../../utils/constants";
import { useEffect, useState } from "react";

function getDaysInMonth(year, month) {
  const lastDay = new Date(year, month, 0).getDate(); // Récupère le dernier jour du mois spécifié
  return Array.from({ length: lastDay }, (_, index) => index + 1); // retourne un tableau ( partant de 1 jusqu'au dernier jour)
}

function getDayOfWeek(month, year) {
  const date = new Date(year + "-" + month);
  const dayOfWeekIndex = date.getDay();
  return dayOfWeekIndex;
}

function DisplayPreviousDays({ date }) {
  const lastDay = new Date(date);
  lastDay.setDate(0); // Sélectionne le dernier jour du mois précédent
  const position = lastDay.getDay() + 1; // Récupère la position, dans la semaine, du premier jour du mois en cours (0: Sunday, 1: Monday,..)

  const previousDays = [];
  for (let i = position; i > 0; i--) {
    previousDays.push(
      <div className="calendar__grid--day-empty" key={"previous-" + i}>
        {lastDay.getDate() - (i - 1)}
      </div>
    );
  }

  return previousDays;
}

function DatePicker() {
  const [isVisible, setIsVisible] = useState(false);
  const [dateDisplay, setdateDisplay] = useState("Select a date");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [temporaryDate, settemporaryDate] = useState(new Date());
  const [actualDay, setActualDay] = useState(currentDate.getDate());
  const [actualMonth, setActualMonth] = useState(currentDate.getMonth() + 1);
  const [actualYear, setActualYear] = useState(currentDate.getFullYear());

  const daysInCurrentMonth = getDaysInMonth(actualYear, actualMonth);
  const daysInPreviousMonth = getDaysInMonth(actualYear, actualMonth - 1);
  const firstDayOfTheMonth = getDayOfWeek(actualMonth, actualYear);

  const maxArrayHeight =
    firstDayOfTheMonth + daysInCurrentMonth.length > 35 ? 42 : 35;

  useEffect(() => {
    setActualDay(temporaryDate.getDate());
    setActualMonth(temporaryDate.getMonth() + 1);
    setActualYear(temporaryDate.getFullYear());
  }, [temporaryDate]);

  return (
    <div className="calendar-container">
      <div className="calendar-input" onClick={() => setIsVisible(!isVisible)}>
        {dateDisplay}
      </div>
      {isVisible && (
        <div className="calendar">
          <div className="calendar__navigation">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() => {
                const updatedDate = new Date(temporaryDate);
                updatedDate.setMonth(updatedDate.getMonth() - 1);
                settemporaryDate(updatedDate);
              }}
            ></i>
            <i
              className="fa-solid fa-house"
              onClick={() => {
                const resetDate = new Date();
                setCurrentDate(resetDate);
                settemporaryDate(resetDate);
                setdateDisplay(
                  resetDate.getDate() +
                    "/" +
                    (resetDate.getMonth() + 1) +
                    "/" +
                    resetDate.getFullYear()
                );
              }}
            ></i>
            <div className="calendar__navigation--month">
              {NAMES_BY_MONTH.FR[actualMonth - 1]}
            </div>
            <div className="calendar__navigation--year">{actualYear}</div>
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => {
                const updatedDate = new Date(temporaryDate);
                updatedDate.setMonth(updatedDate.getMonth() + 1);
                settemporaryDate(updatedDate);
              }}
            ></i>
          </div>

          {/* Nom des jours de la semaine */}
          <div className="calendar__grid">
            {NAMES_BY_DAYS.EN.map((day) => {
              return (
                <div className="calendar__grid--dayName" key={day}>
                  {day}
                </div>
              );
            })}
          </div>

          {/* Jours du calendrier */}
          <div className="calendar__grid">
            {/* Derniers jours du mois précédent */}
            <DisplayPreviousDays date={temporaryDate} />

            {/* Jours du mois en cours */}
            {daysInCurrentMonth.map((day) => {
              return (
                <div
                  className={
                    actualDay === day &&
                    actualMonth === currentDate.getMonth() + 1
                      ? "calendar__grid--actual-day"
                      : "calendar__grid--day"
                  }
                  key={"current-" + day}
                  onClick={() => {
                    const updatedDate = new Date(temporaryDate);
                    updatedDate.setDate(day);
                    settemporaryDate(updatedDate);
                    setCurrentDate(updatedDate);
                    setdateDisplay(
                      updatedDate.getDate() +
                        "/" +
                        (updatedDate.getMonth() + 1) +
                        "/" +
                        updatedDate.getFullYear()
                    );
                    setIsVisible(!isVisible);
                  }}
                >
                  {day}
                </div>
              );
            })}

            {/* Premier jour du mois suivant */}
            {Array.from({
              length:
                maxArrayHeight -
                (firstDayOfTheMonth + daysInCurrentMonth.length),
            }).map((_, index) => {
              return (
                <div
                  className="calendar__grid--day-empty"
                  key={"next-" + index}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
