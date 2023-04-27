import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import logo from '../assets/expedia.png';

function Header() {

  console.log(sessionStorage.getItem('username'));

  const { loginUsername } = useContext(AppContext);

  const { setLoginUsername } = useContext(AppContext);

  //loginUsername = sessionStorage.getItem('username');



  const handleChange = (event) => {
    sessionStorage.removeItem('username');
    setLoginUsername('');
  };

  if(loginUsername === null){
    setLoginUsername('');
  }

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
          {loginUsername!== ''  ? (
            <div className="d-flex justify-content-center align-items-center">
              <Link
                to="/orders"
                className="btn-link me-2 fs-5"
                style={{ cursor: 'pointer' }}
              >
                Orders                
              </Link>
              <Link to="/profile" className="btn-link me-2 fs-5">
                {loginUsername}
              </Link>
              <a href="/" className="nav-link me-2 text-white fs-5" onClick={handleChange}>
                Logout
              </a>
            </div>
          ) : (
            <div className="text-end">
              <Link
                type="button"
                to="/login"
                className="btn btn-outline-light me-2"
                data-bs-toggle="modal"
                data-bs-target="#modalLogin"
                id="loginButton"
              >
                Log In
              </Link>
              <Link
                type="button"
                to="/signup"
                className="btn btn-info"
                data-bs-toggle="modal"
                data-bs-target="#modalSignUp"
                id="signUpButton"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
