import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "red" };
  } else {
    return { color: "black" };
  }
};

const Menu = ({ history, path }) => {
  return (
    <div className='d-flex align-content-center justify-content-center'>
      <ul className='nav nav-tabs bg-white'>
        <li className='nav-item'>
          <Link style={currentTab(history, "/")} to='/' className='nav-link'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, "/cart")}
            to='/cart'
            className='nav-link'
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && (
          <li className='nav-item'>
            <Link
              style={currentTab(history, "/user/dashboard")}
              to='/user/dashboard'
              className='nav-link'
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className='nav-item'>
              <Link
                style={currentTab(history, "/signin")}
                to='/signin'
                className='nav-link'
              >
                Signin
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                style={currentTab(history, "/signup")}
                to='/signup'
                className='nav-link'
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className='nav-item' style={{ cursor: "pointer" }}>
            <span
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
              className='nav-link'
            >
              Log out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
