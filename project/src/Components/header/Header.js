//Imports
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import imgs from "./images/logo.png";
import { loginContextObj } from "../context/packContext";
//Functional Component
function Header() {
  let { userLoginStatus } = useContext(loginContextObj);
  let { handleLogout } = useContext(loginContextObj);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <img
            className="navbar-brand justify-content-start"
            src={imgs}
            alt=""
          />
        </div>

        <div>
          <ul className="nav   justify-content-end fs-4 p-3">
            {/* Conditional Rendering */}
            {userLoginStatus === false ? (
              <>
                <li className="nav-item ">
                  <NavLink className="nav-link text-light" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/About">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/Contact">
                    Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/Register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item text-dark" onClick={handleLogout}>
                <NavLink className="nav-link text-light" to="">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
