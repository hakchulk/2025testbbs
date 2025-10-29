import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../App.css";

function MenuComp() {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          LOGO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav menu ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/board">
                목록
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuComp;
