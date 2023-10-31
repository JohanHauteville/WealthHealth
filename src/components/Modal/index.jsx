import "./styles.scss";
import { PiCheckCircleDuotone } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

function Modal({ message, visible, error }) {
  const [iconStyle, setIconStyle] = useState("icon icon--valid");

  useEffect(() => {
    if (error) {
      setIconStyle("icon icon--error");
    } else {
      setIconStyle("icon icon--valid");
    }
  }, [error]);

  return (
    <div
      className={
        visible === true ? "modal__background" : "modal__background--hidden"
      }
    >
      <div className="modal__container">
        <IconContext.Provider value={{ className: iconStyle }}>
          {error === true ? <ImCross /> : <PiCheckCircleDuotone />}
        </IconContext.Provider>
        <p className="modal__message">{message}</p>
      </div>
    </div>
  );
}

export default Modal;
