import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import "./pages.css";
import { Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import MainLayout from "./MainLayout";
import { BsPlus } from "react-icons/bs";

const Home = () => {
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [paragraph4, setParagraph4] = useState("");
  const [paragraph5, setParagraph5] = useState("");
  const [menuData, setMenuData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "home"));
      setMenuData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
      );
    };
    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDoc(doc(db, `home/${documentId}`), {
        Heading1: heading1,
        Heading2: heading2,
        Paragraph1: paragraph1,
        Paragraph2: paragraph2,
        Paragraph3: paragraph3,
        Paragraph4: paragraph4,
        Paragraph5: paragraph5,
      });
      setIsEditing(false);
      setDocumentId("");
      alert("Data Successfully Updated");
    } else {
      await addDoc(collection(db, "home"), {
        Heading1: heading1,
        Heading2: heading2,
        Paragraph1: paragraph1,
        Paragraph2: paragraph2,
        Paragraph3: paragraph3,
        Paragraph4: paragraph4,
        Paragraph5: paragraph5,
      });
      alert("Data Successfully Submitted");
    }
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, `home/${id}`));
    alert("Data Successfully Deleted");
  };

  const editData = (data) => {
    setHeading1(data.Heading1);
    setHeading2(data.Heading2);
    setParagraph1(data.Paragraph1);
    setParagraph2(data.Paragraph2);
    setParagraph3(data.Paragraph3);
    setParagraph4(data.Paragraph4);
    setParagraph5(data.Paragraph5);
    setIsEditing(true);
    setDocumentId(data.id);
  };

  return (
    <>
      <MainLayout />
      <div className="main-div">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header
              style={{ padding: "3px 3px 3px 3px", color: "grey" }}
            >
              <BsPlus />
            </Accordion.Header>
            <Accordion.Body>
              <center>
                <Form onSubmit={submitForm}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "100%" }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Heading1"
                          value={heading1}
                          onChange={(e) => setHeading1(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    &nbsp;
                    <div style={{ width: "100%" }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Heading2"
                          value={heading2}
                          onChange={(e) => setHeading2(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Paragraph1"
                      value={paragraph1}
                      onChange={(e) => setParagraph1(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Paragraph2"
                      value={paragraph2}
                      onChange={(e) => setParagraph2(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Paragraph3"
                      value={paragraph3}
                      onChange={(e) => setParagraph3(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Paragraph4"
                      value={paragraph4}
                      onChange={(e) => setParagraph4(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Paragraph5"
                      value={paragraph5}
                      onChange={(e) => setParagraph5(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    {isEditing ? "Update" : "Add Data"}
                  </Button>
                </Form>
              </center>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="0">
            <Accordion.Header style={{ padding: "3px 3px 3px 3px" }}>
              <h3 style={{ padding: "30px 10px 30px 10px" }}>View Home Page</h3>
            </Accordion.Header>
            <Accordion.Body>
              {menuData && Object.keys(menuData).length !== 0 && (
                <div style={{ marginTop: "10px" }}>
                  <div style={{ display: "flex" }}>
                    <h1>{menuData.Heading1}</h1>
                  </div>
                  <p>{menuData.Paragraph1}</p>
                  <h1>{menuData.Heading2}</h1>
                  <p>{menuData.Paragraph2}</p>
                  <p>{menuData.Paragraph3}</p>
                  <p>{menuData.Paragraph4}</p>
                  <p>{menuData.Paragraph5}</p>
                  <br />
                  <Button
                    variant="secondary"
                    onClick={() => editData(menuData)}
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="danger"
                    onClick={() => deleteData(menuData.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Home;
