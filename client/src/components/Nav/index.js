import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
      <Link className="navbar-brand" to="/">
        Magic HR
        </Link>
    </nav>
  );
}

export default Nav;
