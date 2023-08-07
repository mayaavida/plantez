import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import Search from "../Search/Search";

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <Search />
      <RegisterForm />
      <h4>Already a Member?</h4>
      <button className="btn btn_sizeSm" onClick={onLogin}>
        Login
      </button>
    </div>
  );
}

export default LandingPage;
