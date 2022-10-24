import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Checklist() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div className="d-flex">
      <h1>Checklist Item</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
