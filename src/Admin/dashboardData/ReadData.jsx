import React, { useEffect, useState } from "react";
import "../Pages/pages.css";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import ModalComp from "../Pages/ModalComp";
import ProductForm from "../Pages/ProductForm";
import { GrFormView } from "react-icons/gr";
import { AiFillEdit, AiOutlineFolderView } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import ModalDashboard from "./ModalDashboard";

function MachineList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "addData"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
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
        await deleteDoc(doc(db, "addData", id));
        setData(data.filter((user) => user.id !== id));
      } catch (err) {
        console.log(err);
        // navigate("/dashboard")
      }
    }

    navigate("/");
  };
  const handleModal = (item) => {
    setOpen(true);
    setUser(item);
    
  };
  const handleAddData = () => {
    navigate("/add-data");
  }

  console.log(data);

  return (
    <>
      <Container>
        <Row>
          <Col style={{ padding: "20px", textAlign: "left" }} sm={6}>
            <h4>COMPANY PROFILE </h4>
          </Col>
          <Col style={{ padding: "20px", textAlign: "right" }} sm={6}>
            <Button
              variant="dark"
              style={{ margin: "auto" }}
              onClick={() => handleAddData()}
            >
              <BsPlusLg />
            </Button>
          </Col>
        </Row>
        <Row>
          <Table bordered responsive="sm">
            <thead>
              <tr>
                <th>Machine Type</th>
                <th>Quantity</th>
                <th>Output per Machine Per Hours</th>
                <th>Hours Per Day Machine Is Run</th>
                <th>Day Per Week Machine is Run</th>
                <th>Estimated Output Per Month (automatic calculation)</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            {data &&
              data.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>
                      <p style={{ margin: "auto", width:"250px" }}>{item.d1}</p>
                    </td>
                    <td>
                      <p style={{ margin: "auto" }}>{item.d2}</p>
                    </td>
                    <td>
                      <p style={{ margin: "auto" }}>{item.d3}</p>
                    </td>
                    <td>
                      <p style={{ margin: "auto" }}>{item.d4}</p>
                    </td>
                    <td>
                      <p style={{ margin: "auto" }}>{item.d5}</p>
                    </td>
                    <td>
                      <p style={{ margin: "auto" }}>{item.d6}</p>
                    </td>

                    <td style={{ margin: "auto" }}>
                      <Button
                        className="btn-dashboard"
                        onClick={() => navigate(`/data-form/${item.id}`)}
                      >
                        <AiFillEdit />
                      </Button>
                    </td>
                    {/* &nbsp;&nbsp; */}
                    <td style={{ margin: "auto" }}>
                      {/* <Button variant="danger" onClick={() => handleDelete(id)}>
                        Delete
                      </Button> */}
                      <Button className="btn-dashboard"
                        style={{ margin: "auto" }}
                        onClick={() => handleModal(item)}
                      >
                        <AiOutlineFolderView style={{color:"black", fontSize:"20px"}} />
                      </Button>
                      <ModalDashboard style={{ margin: "auto" }} />
                      {open && (
                        <ModalDashboard
                          open={open}
                          setOpen={setOpen}
                          handleDelete={handleDelete}
                          {...user}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </Row>
      </Container>
    </>
  );
}
export default MachineList;
