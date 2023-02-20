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
import Accordion from "react-bootstrap/Accordion";
import { Button, Form } from "react-bootstrap";
import MainLayout from "./MainLayout";
import { BsPlus } from "react-icons/bs";

const About = () => {
  const [heading, setHeading] = useState("");
  const [tagline, setTagline] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [menuData, setMenuData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "about"));
      setMenuData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
      );
    };
    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDoc(doc(db, `about/${documentId}`), {
        Heading: heading,
        Tagline: tagline,
        Paragraph1: paragraph1,
        Paragraph2: paragraph2,
        Paragraph3: paragraph3,
      });
      setIsEditing(false);
      setDocumentId("");
      alert("Data Successfully Updated");
    } else {
      await addDoc(collection(db, "about"), {
        Heading: heading,
        Tagline: tagline,
        Paragraph1: paragraph1,
        Paragraph2: paragraph2,
        Paragraph3: paragraph3,
      });
      alert("Data Successfully Submitted");
    }
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, `about/${id}`));
    alert("Data Successfully Deleted");
  };

  const editData = (data) => {
    setHeading(data.Heading);
    setTagline(data.Tagline);
    setParagraph1(data.Paragraph1);
    setParagraph2(data.Paragraph2);
    setParagraph3(data.Paragraph3);
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
                          placeholder="Heading"
                          value={heading}
                          onChange={(e) => setHeading(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    &nbsp;
                    <div style={{ width: "100%" }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Tagline"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
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
                  <Button variant="success" type="submit">
                    {isEditing ? "Update" : "Add Data"}
                  </Button>
                </Form>
              </center>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="0">
            <Accordion.Header style={{ padding: "3px 3px 3px 3px" }}>
              <h3 style={{ padding: "30px 10px 30px 10px" }}>
                View About Page
              </h3>
            </Accordion.Header>
            <Accordion.Body>
              {menuData && Object.keys(menuData).length !== 0 && (
                <div style={{ marginTop: "10px" }}>
                  <h1>{menuData.Heading}</h1>
                  <h3>{menuData.Tagline}</h3>
                  <p>{menuData.Paragraph1}</p>
                  <p>{menuData.Paragraph2}</p>
                  <p>{menuData.Paragraph3}</p>
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

export default About;
