import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/starAlliance.webp";

function Header() {
  console.log(sessionStorage.getItem("username"));

  //loginUsername = sessionStorage.getItem('username');


  return (
    <header className="p-1 text-bg-dark sticky-top">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Logo"
              width="70"
              height="70"
              className="d-inline-block align-text-top"
            />
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white fs-4">
                Home
              </Link>
            </li>
          </ul>


          <div className="text-end">
            <Link
              type="button"
              to="/"
              className="btn btn-outline-light me-2"
              data-bs-toggle="modal"
              data-bs-target="#modalLogin"
              id="loginButton"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
