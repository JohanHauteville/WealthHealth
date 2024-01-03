import { useEffect, useState, useRef } from "react";
import "./styles.scss";

/**
 *
 * @name DropDown-component
 * @param {String} defaultName default name to display before the user select an option
 * @param {String} name name used for the id
 * @param {Array of String - Array of Object} itemList Should be an array of string. If it's an array of objects, "name" property must be present .
 * @returns A DropDown component
 */
function Dropdown({ defaultName, name, itemList }) {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectValue, setSelectValue] = useState(defaultName);
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
        {typeof itemList[0] === "string"
          ? itemList.map((item) => {
              return (
                <div
                  className="select-item"
                  key={item}
                  onClick={() => {
                    setSelectValue(item);
                    setIsSelectOpened(!isSelectOpened);
                  }}
                >
                  {item}
                </div>
              );
            })
          : itemList.map((item) => {
              return (
                <div
                  className="select-item"
                  key={item.name}
                  onClick={() => {
                    setSelectValue(item.name);
                    setIsSelectOpened(!isSelectOpened);
                  }}
                >
                  {item.name}
                </div>
              );
            })}
      </div>
    </div>
  );
}
export default Dropdown;
