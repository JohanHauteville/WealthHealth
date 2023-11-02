import { useEffect, useState } from "react";
import "./styles.scss";

function Dropdown({ name, itemList, onChange }) {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectValue, setSelectValue] = useState(itemList[0]);
  const [icon, setIcon] = useState("fa-solid fa-chevron-down");

  const handleSelectClick = () => {
    setIsSelectOpened(!isSelectOpened);
  };

  useEffect(() => {
    isSelectOpened
      ? setIcon("fa-solid fa-chevron-up")
      : setIcon("fa-solid fa-chevron-down");
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
