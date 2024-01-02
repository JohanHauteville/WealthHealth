import "./styles.scss";
import { NAMES_BY_DAYS, NAMES_BY_MONTH } from "../../utils/constants";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  DisplayPreviousDays,
  RemainingDaysToDisplay,
  YearsScreen,
  MonthsScreen,
} from "./components";

/**
 *
 * @param {String} year
 * @param {String} month
 * @returns An array ( from 1 to the last day)
 */
function getDaysInMonth(year, month) {
  const lastDay = new Date(year, month, 0).getDate(); // Get the last day of specified month
  return Array.from({ length: lastDay }, (_, index) => index + 1); // Return an array ( from 1 to the last day)
}

/**
 *
 * @param {String} month
 * @param {String} year
 * @returns Index representing the first day in a week of the month
 */
function getDayOfWeek(month, year) {
  const date = new Date(year + "-" + month);
  const dayOfWeekIndex = date.getDay();
  return dayOfWeekIndex;
}

/**
 * @name DatePicker-react-component
 * @param {String} id
 * @param {Boolean} majority (default date - 18 years) if true
 * @returns DatePicker component
 */
function DatePicker({ id, majority }) {
  const defaultMessage = "Select a date";
  // USESTATES
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

  // USEMEMO
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

  /**
   * @description Close the DatePicker window if an outside click is detected
   * @param {Event} event
   */
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
      {/* DATEPICKER WINDOW */}
      {isVisible && (
        <div className="calendar" ref={datePickerRef}>
          {/* MONTH SELECTION COMPONENT*/}
          {MonthSelectIsVisible && (
            <MonthsScreen
              date={temporaryDate}
              setDate={setTemporaryDate}
              setIsClosed={setMonthSelectIsVisible}
            />
          )}
          {/* YEARS SELECTION COMPONENT*/}
          {yearSelectIsVisible && (
            <YearsScreen
              date={temporaryDate}
              setDate={setTemporaryDate}
              setIsClosed={setYearSelectIsVisible}
            />
          )}

          {/* NAVIGATION */}
          <div className="calendar__navigation">
            {/* LEFT ARROW BUTTON*/}
            <i
              className="fa-solid fa-chevron-left"
              onClick={() => {
                const updatedDate = new Date(temporaryDate);
                updatedDate.setMonth(updatedDate.getMonth() - 1);
                setTemporaryDate(updatedDate);
              }}
            ></i>
            {/* HOME BUTTON */}
            <i
              className="fa-solid fa-house"
              onClick={() => {
                const resetDate = new Date();
                setCurrentDate(resetDate);
                setTemporaryDate(resetDate);
              }}
            ></i>
            {/* MONTH SELECTION BUTTON */}
            <div
              className="calendar__navigation--month"
              onClick={() => setMonthSelectIsVisible(!MonthSelectIsVisible)}
            >
              {NAMES_BY_MONTH.EN[actualMonth - 1]}
            </div>
            {/* YEARS SELECTION BUTTON */}
            <div
              className="calendar__navigation--year"
              onClick={() => setYearSelectIsVisible(!yearSelectIsVisible)}
            >
              {actualYear}
            </div>
            {/* RIGHT ARROW BUTTON */}
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => {
                const updatedDate = new Date(temporaryDate);
                updatedDate.setMonth(updatedDate.getMonth() + 1);
                setTemporaryDate(updatedDate);
              }}
            ></i>
          </div>

          {/* NAME REPRESENTING DAYS OF THE WEEK */}
          <div className="calendar__grid">
            {NAMES_BY_DAYS.EN.map((day) => {
              return (
                <div className="calendar__grid--dayName" key={day}>
                  {day}
                </div>
              );
            })}
          </div>

          {/* CALENDAR DAYS */}
          <div className="calendar__grid">
            {/* LAST DAYS OF THE PREVIOUS MONTH */}
            <DisplayPreviousDays date={temporaryDate} />

            {/* ACTUAL MONTH DAYS */}
            {daysInCurrentMonth.map((day) => {
              return (
                <div
                  className={
                    parseInt(actualDay, 10) === day &&
                    parseInt(actualMonth, 10) === currentDate.getMonth() + 1 &&
                    parseInt(actualYear, 10) === currentDate.getFullYear()
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

            {/* FIRST DAYS OF THE NEXT MONTH */}
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
