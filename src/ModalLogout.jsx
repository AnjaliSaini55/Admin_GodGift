import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Admin/Pages/pages.css";
import Profile from "./Profile";

function ModalLogin() {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Button className="modal-btn" onClick={() => setLgShow(true)}>
        {" "}
        Log Out
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Profile />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalLogin;
