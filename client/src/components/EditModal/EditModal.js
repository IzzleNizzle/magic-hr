import React from "react";
import Modal from 'react-bootstrap/Modal';


export function EditModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          {props.message}
        </h5>

        {props.children}

      </Modal.Body>
    </Modal>
  )
};


export default EditModal;
