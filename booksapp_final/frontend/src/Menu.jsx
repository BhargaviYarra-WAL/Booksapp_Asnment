import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './styles/Menu.css';

export default function Menu() {
  const navigate = useNavigate();

  window.onload = () => {
    if (localStorage.getItem('regtoken')) {
      document.querySelector('#add').style.display = 'block';
      document.querySelector('#list').style.display = 'block';
      document.querySelector('#login-btn').style.display = 'none';
      document.querySelector('#logout-btn').style.display = 'inline';
    }
  };
  const onLogOut = () => {
    localStorage.setItem('regtoken', '');
    document.querySelector('#add').style.display = 'none';
    document.querySelector('#list').style.display = 'none';
    document.querySelector('#login-btn').style.display = 'inline';
    document.querySelector('#logout-btn').style.display = 'none';
    navigate('/');
  };
  return (
    <div className="header-blue">
      <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Books Manager App
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li id="add" className="nav-item" role="presentation">
                <Link className="nav-link" to="/add">
                  Add Book
                </Link>
              </li>

              <li id="list" className="nav-item" role="presentation">
                <Link className="nav-link" to="/list">
                  List Books
                </Link>
              </li>

              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="#/">
                  About
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="#/">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="ml-auto text-right">
              <Link
                id="login-btn"
                className="btn action-button m-1"
                to="/login"
              >
                Log In
              </Link>

              <button
                type="button"
                id="logout-btn"
                className="btn action-button m-1"
                onClick={onLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
