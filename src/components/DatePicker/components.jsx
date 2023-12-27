export function DisplayPreviousDays({ date }) {
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

// export function ActualsDaysInMonth({ daysInCurrentMonth }) {
//   daysInCurrentMonth.map((day) => {
//     return (
//       <div
//         className={
//           actualDay === day &&
//           actualMonth === currentDate.getMonth() + 1
//             ? "calendar__grid--actual-day"
//             : "calendar__grid--day"
//         }
//         key={"current-" + day}
//         onClick={() => {
//           const updatedDate = new Date(temporaryDate);
//           updatedDate.setDate(day);
//           setTemporaryDate(updatedDate);
//           setCurrentDate(updatedDate);
//           setdateDisplay(
//             updatedDate.getDate() +
//               "/" +
//               (updatedDate.getMonth() + 1) +
//               "/" +
//               updatedDate.getFullYear()
//           );
//           console.log(dateDisplay);
//           setIsVisible(false);
//         }}
//       >
//         {day}
//       </div>
//     );
//   })
// }
