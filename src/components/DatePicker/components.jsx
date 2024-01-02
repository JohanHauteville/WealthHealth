import { NAMES_BY_MONTH } from "../../utils/constants";

/**
 * @name DisplayPreviousDays
 * @description Create an array containing div elements representing last days before the current month.
 * @param {Date} date
 * @returns An array containing div elements representing last days before the current month.
 */
export function DisplayPreviousDays({ date }) {
  const lastDay = new Date(date);
  lastDay.setDate(0); // Select the last day of the previous month
  const position = lastDay.getDay() + 1; // Get the position in the week of the first day of the actual month (0: Sunday, 1: Monday,..)

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

/**
 * @name RemainingDaysToDisplay
 * @description Create an array containing div elements representing the first days after the current month.
 * @param {Number} firstDayOfTheMonth
 * @param {Number} daysInCurrentMonth
 * @returns An array containing div elements representing the first days after the current month.
 */
export function RemainingDaysToDisplay({
  maxArrayHeight,
  firstDayOfTheMonth,
  daysInCurrentMonth,
}) {
  const arrayLength =
    maxArrayHeight - (firstDayOfTheMonth + daysInCurrentMonth.length);

  let arrayOfDays = [];
  for (let i = 0; i < arrayLength; i++) {
    arrayOfDays.push(i);
  }
  const arrayToReturn = arrayOfDays.map((day) => {
    return (
      <div className="calendar__grid--day-empty" key={"next-" + day}>
        {day + 1}
      </div>
    );
  });
  return arrayToReturn;
}

/**
 * @name YearsScreen
 * @description Create an array of div elements representing the previous 10 years and the next 10 years.
 * @param {Date} date
 * @param {Function} setDate
 * @param {Function} setIsClosed
 * @returns An array of div elements representing the previous 10 years and the next 10 years.
 */
export function YearsScreen({ date, setDate, setIsClosed }) {
  const yearsArray = [];
  for (let i = -10; i <= 10; i++) {
    yearsArray.push(
      <div
        key={"year-" + (date.getFullYear() + i)}
        onClick={() => {
          const updateDate = new Date(date);
          updateDate.setFullYear(date.getFullYear() + i);
          setDate(updateDate);
          setIsClosed(false);
        }}
      >
        {date.getFullYear() + i}
      </div>
    );
  }

  return <div className="calendar__page">{yearsArray}</div>;
}

/**
 * @name YearsScreen
 * @description Create an array of div elements representing the 12 months in a year.
 * @param {Date} date
 * @param {Function} setDate
 * @param {Function} setIsClosed
 * @requires {Object} NAMES_BY_MONTH: Contening all the months names by languages: {EN: ["january","February",...]}
 * @returns An array of div elements representing the 12 months in a year.
 */
export function MonthsScreen({ date, setDate, setIsClosed }) {
  const monthsArray = [];
  monthsArray.push(
    NAMES_BY_MONTH.EN.map((month, indice) => {
      return (
        <div
          key={month}
          onClick={() => {
            const updateDate = new Date(date);
            updateDate.setMonth(indice);
            setDate(updateDate);
            setIsClosed(false);
          }}
        >
          {month}
        </div>
      );
    })
  );
  return <div className="calendar__page">{monthsArray}</div>;
}
