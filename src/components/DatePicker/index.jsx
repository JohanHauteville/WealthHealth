import "./styles.scss";
import { NAMES_BY_DAYS, NAMES_BY_MONTH } from "../../utils/constants";
import { useEffect, useState, useRef, useMemo } from "react";
import { DisplayPreviousDays, RemainingDaysToDisplay } from "./components";

function getDaysInMonth(year, month) {
  const lastDay = new Date(year, month, 0).getDate(); // Récupère le dernier jour du mois spécifié
  return Array.from({ length: lastDay }, (_, index) => index + 1); // retourne un tableau ( partant de 1 jusqu'au dernier jour)
}

function getDayOfWeek(month, year) {
  const date = new Date(year + "-" + month);
  const dayOfWeekIndex = date.getDay();
  return dayOfWeekIndex;
}

function YearsScreen({ date, setDate, setIsClosed }) {
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

function DatePicker({ id, majority, setValue }) {
  const defaultMessage = "Select a date";
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [MonthSelectIsVisible, setMonthSelectIsVisible] = useState(false);
  const [yearSelectIsVisible, setYearSelectIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    if (majority) {
      date.setFullYear(date.getFullYear() - 18);
    }
    return date;
  });
  const [temporaryDate, setTemporaryDate] = useState(() => {
    const date = new Date();
    if (majority) {
      date.setFullYear(date.getFullYear() - 18);
    }
    return date;
  });

  const actualDay = useMemo(() => {
    const day = temporaryDate.getDate();
    return day.toLocaleString("en-US", { minimumIntegerDigits: 2 });
  }, [temporaryDate]);
  const actualMonth = useMemo(() => {
    const month = parseInt(temporaryDate.getMonth(), 10) + 1.0;
    return month.toLocaleString("en-US", { minimumIntegerDigits: 2 });
  }, [temporaryDate]);
  const actualYear = useMemo(() => {
    return temporaryDate.getFullYear();
  }, [temporaryDate]);

  const daysInCurrentMonth = useMemo(() => {
    return getDaysInMonth(actualYear, actualMonth);
  }, [actualYear, actualMonth]);

  const firstDayOfTheMonth = getDayOfWeek(actualMonth, actualYear);

  const maxArrayHeight = useMemo(() => {
    if (daysInCurrentMonth) {
      return firstDayOfTheMonth + daysInCurrentMonth.length > 35 ? 42 : 35;
    }
  }, [firstDayOfTheMonth, daysInCurrentMonth]);

  const datePickerRef = useRef(null);

  const dateDisplay = useMemo(() => {
    if (!firstAttempt) {
      return actualDay + "/" + actualMonth + "/" + actualYear;
    } else {
      return defaultMessage;
    }
  }, [actualDay, actualMonth, actualYear, firstAttempt]);

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isVisible]);

  return (
    <div className="calendar-container">
      <div
        className="calendar-input"
        id={id}
        onClick={() => {
          setIsVisible(!isVisible);
          setYearSelectIsVisible(false);
          setMonthSelectIsVisible(false);
        }}
      >
        {actualDay && actualMonth && actualYear ? dateDisplay : defaultMessage}
      </div>
      {isVisible && (
        <div className="calendar" ref={datePickerRef}>
          {MonthSelectIsVisible && (
            <div className="calendar__page">
              {NAMES_BY_MONTH.EN.map((month, indice) => {
                return (
                  <div
                    key={month}
                    onClick={() => {
                      const updateDate = new Date(temporaryDate);
                      updateDate.setMonth(indice);
                      setTemporaryDate(updateDate);
                      setMonthSelectIsVisible(false);
                    }}
                  >
                    {month}
                  </div>
                );
              })}
            </div>
          )}
          {yearSelectIsVisible && (
            <YearsScreen
              date={temporaryDate}
              setDate={setTemporaryDate}
              setIsClosed={setYearSelectIsVisible}
            />
          )}

          <div className="calendar__navigation">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() => {
                const updatedDate = new Date(temporaryDate);
                updatedDate.setMonth(updatedDate.getMonth() - 1);
                setTemporaryDate(updatedDate);
              }}
            ></i>
            <i
              className="fa-solid fa-house"
              onClick={() => {
                const resetDate = new Date();
                setCurrentDate(resetDate);
                setTemporaryDate(resetDate);
              }}
            ></i>
            <div
              className="calendar__navigation--month"
              onClick={() => setMonthSelectIsVisible(!MonthSelectIsVisible)}
            >
              {NAMES_BY_MONTH.EN[actualMonth - 1]}
            </div>
            <div
              className="calendar__navigation--year"
              onClick={() => setYearSelectIsVisible(!yearSelectIsVisible)}
            >
              {actualYear}
            </div>
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => {
                const updatedDate = new Date(temporaryDate);
                updatedDate.setMonth(updatedDate.getMonth() + 1);
                setTemporaryDate(updatedDate);
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
                    parseInt(actualDay, 10) ===
                      day.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                      }) &&
                    parseInt(actualMonth, 10) ===
                      (currentDate.getMonth() + 1).toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                      })
                      ? "calendar__grid--actual-day"
                      : "calendar__grid--day"
                  }
                  key={"current-" + day}
                  onClick={() => {
                    const updatedDate = new Date(temporaryDate);
                    updatedDate.setDate(day);
                    setTemporaryDate(updatedDate);
                    setCurrentDate(updatedDate);
                    setFirstAttempt(false);
                    setIsVisible(false);
                  }}
                >
                  {day}
                </div>
              );
            })}

            {/* Premier(s) jour(s) du mois suivant */}
            <RemainingDaysToDisplay
              maxArrayHeight={maxArrayHeight}
              firstDayOfTheMonth={firstDayOfTheMonth}
              daysInCurrentMonth={daysInCurrentMonth}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
