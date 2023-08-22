import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


function Footer() {
  return (
    <footer>
      <p> &copy; Maya Peters & Prime Digital Academy</p>
      <Link to="/tech">
        <p>Technologies Used</p>
      </Link>
    </footer>
  );
}

export default Footer;
