import React from "react";

import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

const ModalComponent = ({ show, onHide, image }) => {
  return (
    <Modal className="" show={show} onHide={onHide} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <picture>
          <source srcSet={image.src} media={image.media} />
          <source srcSet={image.srcSet2x} media={image.media2x} />
          <Image src={image.src} alt={image.alt} fluid />
        </picture>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
