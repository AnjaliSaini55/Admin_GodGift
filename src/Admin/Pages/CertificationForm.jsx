import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Grid, Loader, Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import "./pages.css";
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

const initialState = {
  heading: "",
  paragragh: "",
};
const CertificationForm = () => {
  const [data, setData] = useState(initialState);
  const { heading, paragragh } = data;
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
    const docRef = doc(db, "certification", id);
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
    if (!heading) {
      errors.heading = "Heading is Required";
    }
    if (!paragragh) {
      errors.paragragh = "Paragragh is Required";
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
        await addDoc(collection(db, "certification"), {
          ...data,
        //   timestamp: serverTimestamp(),
          // setIsSubmit(true)
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "certification", id), {
          ...data,
        //   timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    navigate("/certification");
  };

  return (
      <Container className="main-form">
        <div>
          {isSubmit ? (
            <Spinner animation="border" />
          ) : (
            <>
              <h4>{id ? "Update Certification" : "Add Certification"}</h4>
              <br />
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        name="heading"
                        error={
                          errors.heading ? { content: errors.heading } : null
                        }
                        placeholder="Heading"
                        onChange={handleChange}
                        value={heading}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        label="FileUpload"
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                  <br />
                  <Col sm={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        name="paragragh"
                        error={errors.paragragh ? { content: errors.paragragh } : null}
                        placeholder="Paragragh"
                        onChange={handleChange}
                        value={paragragh}
                        as="textarea" rows={3}
                      />
                    </Form.Group>
                  </Col>
                  <br />
                </Row>
                <Button
                  variant="success"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  Submit
                </Button>
              </Form>
            </>
          )}
        </div>
      </Container>
 
  );
};

export default CertificationForm;
