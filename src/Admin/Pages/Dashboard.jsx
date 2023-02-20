import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BsThreeDotsVertical, BsGlobe } from "react-icons/bs";
import ModalLogin from "../../ModalLogout";
import MachineList from "../dashboardData/ReadData";
import "./pages.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboards">
        <div class="dropdown">
          <a target="_blank" href="https://godgift.rrtutorials.com/">
            <button class="dropbtn">
              <BsGlobe />
            </button>
          </a>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <BsThreeDotsVertical />
          </button>
          <div class="dropdown-content">
            <a href="#">
              <ModalLogin />
            </a>
          </div>
        </div>
      </div>
      <Container className="dashboard-card">
        <Row className="dash-row">
          <MachineList />
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
