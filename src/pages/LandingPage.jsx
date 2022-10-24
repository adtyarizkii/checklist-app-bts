import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="p-5">
      <h1>Welcome to Check-list App</h1>
      <p>Please login or register first to continue...</p>
      <div className="d-flex justify-content-center">
        <Button as={Link} to="login" className="me-3">
          Login
        </Button>
        <Button as={Link} to="register">
          Register
        </Button>
      </div>
    </div>
  );
}
