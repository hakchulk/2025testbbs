import React from "react";
import { Link } from "react-router-dom";
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
          {/* ms- : margin start */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="navbar-brand" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/list">
                List
              </Link>
              <Link className="navbar-brand" to="/home/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuComp;
