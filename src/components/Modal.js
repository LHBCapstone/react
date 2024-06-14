import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({
  show,
  onClose,
  title,
  content,
  imgSrc,
  course,
  course_dt,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {imgSrc && <img src={imgSrc} alt={title} className="modal-image" />}
        <h2 className="modal-title">{title}</h2>
        <p className="modal-body">{content}</p>
        <p className={"modal-body-1"}>{course}</p>
        <p className={"modal-body-2"}>{course_dt}</p>
      </div>
    </div>
  );
};

export default Modal;
