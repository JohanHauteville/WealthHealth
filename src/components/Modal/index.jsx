import "./styles.scss";

function Modal({ message, visible, error }) {
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
        <i className="fa-solid fa-circle-xmark icon icon--close"></i>
      </div>
    </div>
  );
}

export default Modal;
