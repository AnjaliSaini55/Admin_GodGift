import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row,Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Modal } from "react-bootstrap";
import { db, storage } from "../../firebase";
import "../Pages/pages.css";
import Spinner from "react-bootstrap/Spinner";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../Pages/MainLayout";
// import MainLayout from "./MainLayout";

const initialState = {
  d1: "",
  d2: "",
  d3: "",
  d4: "",
  d5: "",
  d6: "",
};

const AddData= () => {
    const [data, setData] = useState(initialState);
    const { d1, d2, d3, d4, d5, d6 } = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      id && getSingleUser();
    }, [id]);
  
    const getSingleUser = async () => {
      const docRef = doc(db, "addData", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setData({ ...snapshot.data() });
      }
    };
    useEffect(() => {
      const uploadFile = () => {
        const name = new Date().getTime() + `/files/${file.name}`;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_chage",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is Pause");
                break;
              case "running":
                console.log("Upload is Running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
      };
      file && uploadFile();
    }, [file]);
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    const validate = () => {
      let errors = {};
      if (!d1) {
        errors.d1 = "data1 is Required";
      }
      if (!d2) {
        errors.d2 = "data2 is Required";
      }
      if (!d3) {
        errors.d3 = "data3 is Required";
      }
      if (!d4) {
        errors.d4 = "data4 is Required";
      }
      if (!d5) {
        errors.d5 = "data5 is Required";
      }
      if (!d6) {
        errors.d6 = "data6 is Required";
      }
      return errors;
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      let errors = validate();
      if (Object.keys(errors).length) return setErrors(errors);
      setIsSubmit(true);
      // setData("")
      if (!id) {
        try {
          await addDoc(collection(db, "addData"), {
            ...data,
            timestamp: serverTimestamp(),
            // setIsSubmit(true)
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "addData", id), {
            ...data,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.log(error);
        }
      }
      navigate("/");
    };
  return (<>
    <MainLayout />
      <Container style={{width:"90%"}}>
          {isSubmit ? (
            <Spinner animation="border" />
          ) : (
            <>
              <h4>{id ? "Update Data" : "Add New Data"}</h4>
              <br />
              <Form onSubmit={handleSubmit}>
            <Container className="main-form">
                <Row>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        placeholder="Machine Type"
                        name="d1"
                        error={errors.d1 ? { content: errors.d1 } : null}
                        onChange={handleChange}
                        value={d1}
                        autoFocus
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        placeholder="Quantity"
                        name="d2"
                        error={errors.d2 ? { content: errors.d2 } : null}
                        onChange={handleChange}
                        value={d2}
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        placeholder="Output per Machine Per Hours"
                        name="d3"
                        error={errors.d3 ? { content: errors.d3 } : null}
                        onChange={handleChange}
                        value={d3}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        placeholder="Hours Per Day Machine Is Run"
                        name="d4"
                        error={errors.d4 ? { content: errors.d4 } : null}
                        onChange={handleChange}
                        value={d4}
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        placeholder="Day Per Week Machine is Run"
                        name="d5"
                        error={errors.d5 ? { content: errors.d5 } : null}
                        onChange={handleChange}
                        value={d5}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        placeholder="Estimated Output Per Month"
                        name="d6"
                        error={errors.d6 ? { content: errors.d6 } : null}
                        onChange={handleChange}
                        value={d6}
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                </Container>
                <br />
                <Button
                  variant="success"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Container>
        </>
  )
}

export default AddData