import React, { useEffect, useState } from "react";
import "./pages.css";
import MainLayout from "./MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import Swal from "sweetalert2";

const Products = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
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

  const deleteDatas = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, `users/${id}`));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleAddData = () => {
    navigate("/product-form");
  };
  console.log(users);
  return (
    <>
      <MainLayout />
        <Container>
          <Row>
            <Col style={{ padding: "30px", textAlign: "left" }} sm={6}>
              <h4>PRODUCTS</h4>
            </Col>
            <Col style={{ padding: "30px", textAlign: "right" }} sm={6}>
              <Button
                variant="dark"
                style={{ margin: "auto" }}
                onClick={() => handleAddData()}
              >
                <BsPlusLg />
              </Button>
            </Col>
            <hr />
          </Row>
        </Container>
      <div className="main-div">
        <Container>
          {users &&
            users.map((item) => (
              <Row key={item.id}>
                <Table responsive="sm">
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: "flex", margin: "auto" }}>
                          <img
                            src={item.img}
                            style={{
                              height: "60px",
                              width: "60px",
                              margin: "auto",
                              borderRadius: "50%",
                            }}
                          />
                          <p style={{ margin: "auto", width: "150px" }}>
                            {item.name}
                          </p>
                          <p style={{ margin: "auto", width: "150px" }}>
                            {item.info}
                          </p>
                          <Button
                            variant="success"
                            style={{ margin: "auto" }}
                            onClick={() => navigate(`/product-form/${item.id}`)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            style={{ margin: "auto" }}
                            onClick={() => deleteDatas(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            ))}
        </Container>
      </div>
    </>
  );
};

export default Products;
