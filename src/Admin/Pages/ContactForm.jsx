import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
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
  fname: "",
  lname: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [data, setData] = useState(initialState);
  const { fname, lname, email, phone, message } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(false)

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "contact", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + `/imgs/${file.name}`;
      const storageRef = ref(storage, `/imgs/${file.name}`);
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
    if (!fname) {
      errors.name = "First Name is Required";
    }
    if (!lname) {
      errors.name = "Last Name is Required";
    }
    if (!email) {
      errors.email = "Email is Required";
    }
    if (!phone) {
      errors.phone = "phone is Required";
    }
    if (!message) {
      errors.message = "message is Required";
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
        await addDoc(collection(db, "contact"), {
          ...data,
          timestamp: serverTimestamp(),
          // setIsSubmit(true)
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "contact", id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    navigate("/contact");
  };

  return (
    <div className="form-contact main-div">
      <div>
        {isSubmit ? (
          <Spinner animation="border" />
        ) : (
          <>
            <Form onSubmit={handleSubmit} className="w3-animate-left forms">
              <h2>{id ? "Update Contact Details" : "Add New Product"}</h2>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      label="First Name"
                      name="fname"
                      error={errors.fname ? { content: errors.fname } : null}
                      placeholder="Enter First Name"
                      onChange={handleChange}
                      disabled={fname.length > 0 }
                      value={fname}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      label="Last Name"
                      name="lname"
                      error={errors.lname ? { content: errors.lname } : null}
                      placeholder="Enter Last Name"
                      onChange={handleChange}
                      disabled={isReadOnly}
                      value={lname}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Control
                  label="Email"
                  name="email"
                  error={errors.email ? { content: errors.email } : null}
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={email}
                  autoFocus
                />
              </Form.Group>
              </Col>
                <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Control
                  label="phone"
                  name="phone"
                  error={errors.phone ? { content: errors.phone } : null}
                  placeholder="Enter Phone"
                  onChange={handleChange}
                  value={phone}
                  autoFocus
                />
              </Form.Group>
              </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Control
                  label="FileUpload"
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  label="message"
                  name="message"
                  error={errors.message ? { content: errors.message } : null}
                  placeholder="Enter message"
                  onChange={handleChange}
                  value={message}
                  autoFocus
                  className="form-input"
                  as="textarea"
                  rows={5}
                />
              </Form.Group>
              <Button
                className="form-btn"
                type="submit"
                disabled={progress !== null && progress < 100}
                onClick={() => setIsReadOnly(prev => !prev)}>
                {isReadOnly ? "Enable datalist" : "Disable datalist"}
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
