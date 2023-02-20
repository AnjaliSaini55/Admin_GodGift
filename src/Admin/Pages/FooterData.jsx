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

const FooterData = () => {
  const [website, setWebsite] = useState("");
  const [menu1, setMenu1] = useState("");
  const [menu2, setMenu2] = useState("");
  const [menu3, setMenu3] = useState("");
  const [menu4, setMenu4] = useState("");
  const [tagline, setTagline] = useState("");
  const [menuData, setMenuData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "footer"));
      setMenuData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
      );
    };
    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDoc(doc(db, `footer/${documentId}`), {
        Website: website,
        Menu1: menu1,
        Menu2: menu2,
        Menu3: menu3,
        Menu4: menu4,
        Tagline: tagline,
      });
      setIsEditing(false);
      setDocumentId("");
      alert("Data Successfully Updated");
    } else {
      await addDoc(collection(db, "footer"), {
        Website: website,
        Menu1: menu1,
        Menu2: menu2,
        Menu3: menu3,
        Menu4: menu4,
        Tagline: tagline,
      });
      alert("Data Successfully Submitted");
    }
  };
  const deleteData = async (id) => {
    await deleteDoc(doc(db, `footer/${id}`));
    alert("Data Successfully Deleted");
  };

  const editData = (data) => {
    setWebsite(data.Website);
    setMenu1(data.Menu1);
    setMenu2(data.Menu2);
    setMenu3(data.Menu3);
    setMenu4(data.Menu4);
    setTagline(data.tagline);
    setIsEditing(true);
    setDocumentId(data.id);
  };

  return (
    <div className="main-div">
      <Container>
       <strong><h2>Footer</h2></strong><hr />
        <Row>
          <Col sm={6}>
            <h4 style={{ padding: "0px 0px 30px 30px" }}>Add & Edit</h4>
            <Form onSubmit={submitForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Website Name"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Menu1"
                  value={menu1}
                  onChange={(e) => setMenu1(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Menu2"
                  value={menu2}
                  onChange={(e) => setMenu2(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Menu3"
                  value={menu3}
                  onChange={(e) => setMenu3(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Menu4"
                  value={menu4}
                  onChange={(e) => setMenu4(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                {isEditing ? "Update" : "Add Data"}
              </Button>
            </Form>
          </Col>
          <Col sm={6}>
            <h4 style={{ padding: "0px 10px 30px 30px" }}>Address</h4>
            {menuData && Object.keys(menuData).length !== 0 && (
              <div>
                <p>{menuData.Website}</p>
                <p>{menuData.Menu1}</p>
                <p>{menuData.Menu2}</p>
                <p>{menuData.Menu3}</p>
                <p>{menuData.Menu4}</p>
                <p>{menuData.Tagline}</p>
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

export default FooterData;
