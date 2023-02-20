import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from "../../../firebase";

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleUpdateItemClick = data => {
    firebase
      .firestore()
      .collection("times")
      .doc(data.id)
      .set(data);
    props.setEditing(false);
  };
  return (
    <Form
    onSubmit={event => {
      event.preventDefault();

      props.updateUser(user);
    }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          placeholder="Menu"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          placeholder="Path"
        />
      </Form.Group>
      <Button variant="success"
            onClick={() => handleUpdateItemClick(user)}
            className="button muted-button"
          >
            Update
          </Button>&nbsp;
          <Button variant="danger"
            onClick={() => props.setEditing(false)}
            className="button muted-button"
          >
            Cancel
          </Button><br /><br />
    </Form>
  );
};

export default EditUserForm;
