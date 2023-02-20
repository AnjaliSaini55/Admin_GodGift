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
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Address = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [menuData, setMenuData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "address"));
      setMenuData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
      );
    };
    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDoc(doc(db, `address/${documentId}`), {
        Address1: address1,
        Address2: address2,
        Phone: phone,
        Email: email,
      });
      setIsEditing(false);
      setDocumentId("");
      alert("Data Successfully Updated");
    } else {
      await addDoc(collection(db, "address"), {
        Address1: address1,
        Address2: address2,
        Phone: phone,
        Email: email,
      });
      alert("Data Successfully Submitted");
    }
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, `address/${id}`));
    alert("Data Successfully Deleted");
  };

  const editData = (data) => {
    setAddress1(data.Address1);
    setAddress2(data.Address2);
    setPhone(data.Phone);
    setEmail(data.Email);
    setIsEditing(true);
    setDocumentId(data.id);
  };

  return (
    <div className="main-div">
      <Container>
        <Row>
          <Col sm={6}>
            <h3 style={{ padding: "0px 10px 30px 30px" }}>Add & Edit</h3>
            <Form onSubmit={submitForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Address1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                {isEditing ? "Update" : "Add Data"}
              </Button>
            </Form>
          </Col>
          <Col sm={6}>
            <h3 style={{ padding: "0px 10px 30px 30px" }}>Address</h3>
            {menuData && Object.keys(menuData).length !== 0 && (
              <div>
                <p>{menuData.Address1}</p>
                <p>{menuData.Address2}</p>
                <p>{menuData.Phone}</p>
                <p>{menuData.Email}</p>
                <br />
                <Button variant="secondary" onClick={() => editData(menuData)}>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Address;
