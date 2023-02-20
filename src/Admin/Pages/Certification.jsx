import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./pages.css";
import MainLayout from "./MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import ModalComp from "./ModalComp";
import ProductForm from "./ProductForm";
import { BsPlus } from "react-icons/bs";
import CertificationForm from "./CertificationForm";

const Certification = () => {
  const [certification, setCertification] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "certification"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCertification(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete that user?")) {
      try {
        await deleteDoc(doc(db, "certification", id));
        setCertification(certification.filter((user) => user.id !== id));
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/");
  };
  const handleModal = (item) => {
    setOpen(true);
    setUser(item);
  };
  console.log(certification);
  return (
    <>
      <MainLayout />
      <div className="main-div">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <BsPlus />
            </Accordion.Header>
            <Accordion.Body>
              <CertificationForm />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h4 style={{ padding: "30px 10px 30px 10px" }}>Certification</h4>
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                {/* <Row> */}
                  {certification &&
                    certification.map((item) => (
                      <Row key={item.id}>
                        <Table responsive="sm">
                          <tbody>
                            <tr>
                              <td>
                                <div
                                  style={{ display: "flex", margin: "auto" }}
                                >
                                  <img
                                    src={item.img}
                                    style={{
                                      height: "60px",
                                      width: "60px",
                                      margin: "auto",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <p style={{ margin: "auto" }}>
                                    {item.heading}
                                  </p>
                                  <p style={{ margin: "auto", width: "350px" }}>
                                    {item.paragragh}
                                  </p>
                                  <Button
                                    variant="success"
                                    style={{ margin: "auto" }}
                                    onClick={() =>
                                      navigate(`/certification-form/${item.id}`)
                                    }
                                  >
                                    Update
                                  </Button>&nbsp;&nbsp;
                                  <Button
                                    variant="dark"
                                    style={{ margin: "auto" }}
                                    onClick={() => handleModal(item)}
                                  >
                                    View
                                  </Button>
                                  <ModalComp style={{ margin: "auto" }} />
                                  {open && (
                                    <ModalComp
                                      open={open}
                                      setOpen={setOpen}
                                      handleDelete={handleDelete}
                                      {...user}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Row>
                    ))}
                {/* </Row> */}
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Certification;
