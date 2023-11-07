import { useEffect, useState, useRef } from "react";
import "./styles.scss";

function Dropdown({ name, itemList, onChange }) {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectValue, setSelectValue] = useState(itemList[0]);
  const [icon, setIcon] = useState("fa-solid fa-chevron-down");
  const dropdownRef = useRef(null);

  const handleSelectClick = () => {
    setIsSelectOpened(!isSelectOpened);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSelectOpened(false);
    }
  };

  useEffect(() => {
    if (isSelectOpened) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    isSelectOpened
      ? setIcon("fa-solid fa-chevron-up")
      : setIcon("fa-solid fa-chevron-down");

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isSelectOpened]);

  return (
    <div className="select-container">
      <div
        className="select-selected"
        placeholder={selectValue}
        name={name}
        id={name}
        onClick={handleSelectClick}
      >
        {selectValue}
      </div>
      <i className={icon}></i>
      <div
        ref={dropdownRef}
        className={
          isSelectOpened === false
            ? "select-items select-hide"
            : "select-items select-show"
        }
      >
        {itemList.map((item) => {
          return (
            <div
              className="select-item"
              key={item}
              onClick={() => {
                setSelectValue(item);
                onChange(item);
                setIsSelectOpened(!isSelectOpened);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Dropdown;
