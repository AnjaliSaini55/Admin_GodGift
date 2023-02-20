import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../Pages/pages.css";

const ModalDashboard = ({
  open,
  setOpen,
  d1,
  d2,
  d3,
  d4,
  d5,
  d6,
  id,
  handleDelete,
}) => {
  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex" }}>
          <div style={{ width:"100%" }}>
            <p style={{ color: "black" }}><b>Machine Type :- </b>  {d1}</p>
            <p style={{ color: "black" }}><b>Quantity :- </b> {d2}</p>
            <p style={{ color: "black" }}><b>Output per Machine Per Hours :- </b>{d3}</p>
            </div>
            <div style={{ width:"100%" }}>
            <p style={{ color: "black" }}><b>Hours Per Day Machine Is Run :- </b>{d4}</p>
            <p style={{ color: "black" }}><b>Day Per Week Machine is Run :- </b>{d5}</p>
            <p style={{ color: "black" }}><b>Estimated Output Per Month :- </b>{d6}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDashboard;
