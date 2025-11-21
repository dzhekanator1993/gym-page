import "./style.css";
import React from "react";
import { Transition } from "react-transition-group";
import { ReactComponent as IconClose } from "./xmark.svg";


const Modal = ({ isOpen, onClose, children, title }) => {
  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modal-wrapper")) onClose();
  };

  return (
    <Transition in={isOpen} timeout={350} unmountOnExit={true}>
      {(state) => (
        <div className={`modal modal--${state}`}>
          <div className="modal-wrapper" onClick={onWrapperClick}>
            <div className="modal-content">
              <button className="modal-close-button" onClick={onClose}>
                <IconClose />
              </button>
              {title && <h2 className="title-2">{title}</h2>}
              {children}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Modal;
