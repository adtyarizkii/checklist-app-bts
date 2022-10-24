import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

export default function Login() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process
      const response = await API.post("/login", form);
      // Checking process

      if (response.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        console.log(response);
        navigate("/checklist");

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
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
        <h1>Login</h1>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <Form.Text className="text-muted">
              Don't have an account? <Link to="/register"> Register here.</Link>
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
