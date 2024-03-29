// import { useEffect, useState } from "react";
import "./styles.scss";
import * as modalActions from "../../features/modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
/**
 * @name Modal-react-component
 * @param {String} message
 * @param {Boolean} visible
 * @param {Boolean} error
 * @param {URL} closeLink
 * @returns {JSX.Element}
 */
function Modal({ message, visible, error, closeLink }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClose() {
    closeLink && navigate(closeLink);
    dispatch(modalActions.hideMessage());
  }
  return (
    <div
      className={
        visible === true ? "modal__background" : "modal__background--hidden"
      }
    >
      <div className="modal__container">
        {error === true ? (
          <i className="fa-regular fa-circle-xmark icon icon--error "></i>
        ) : (
          <i className="fa-regular fa-circle-check icon icon--valid"></i>
        )}
        <p className="modal__message">{message}</p>
        <i
          className="fa-solid fa-circle-xmark icon icon--close"
          onClick={() => handleClose()}
        ></i>
      </div>
    </div>
  );
}

export default Modal;
