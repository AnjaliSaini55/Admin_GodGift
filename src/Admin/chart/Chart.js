// import { useState } from "react";
// import { Container, Navbar, Row, Col, Nav } from "react-bootstrap";
// import AddBook from "./components/AddBook";
// import BooksList from "./components/BooksList";

// const Chart = () => {
//   const [bookId, setBookId] = useState("");
//   const getBookIdHandler = (id) => {
//     console.log("The ID of document to be edited: ", id);
//     setBookId(id);
//   };
//   return (
//     <>
//       <Container style={{ width: "400px" }}>
//         <Row>
//           <Col>
//             <AddBook id={bookId} setBookId={setBookId} />
//           </Col>
//         </Row>
//       </Container>
//       <Container style={{ width: "90%" }}>
//         <Row>
//           <Col>
//             <BooksList getBookId={getBookIdHandler} />
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Chart;
