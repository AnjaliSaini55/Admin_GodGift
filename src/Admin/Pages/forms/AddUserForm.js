import React, { useState } from "react";
import firebase from "../../../firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: "", username: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name || !user.username) return;

        props.addUser(user);
        setUser(initialFormState);
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
      <Button variant="success" type="submit">
        Submit
      </Button><br /><br />
    </Form>
  );
};

export default AddUserForm;
