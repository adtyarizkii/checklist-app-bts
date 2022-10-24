import React, { useContext, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function Register() {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data user to database
      const response = await API.post("/register", form);
      //   console.log(response);

      // Notification
      if (response.status === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success, please login to continue..
          </Alert>
        );

        setMessage(alert);
        setForm({
          email: "",
          password: "",
          username: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);

      if (error) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Something wrong..
          </Alert>
        );
        setMessage(alertPassword);
      }
    }
  });

  return (
    <div>
      <div className="p-5">
        <h1>Register</h1>
        {message && message}
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your data with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <Form.Text className="text-muted">
              Already have an account? <Link to="/login"> Login here.</Link>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
