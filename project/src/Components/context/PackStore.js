//import necessary dependencies and modules
import React from "react";
import axios from "axios";
import { useState } from "react";
import { loginContextObj } from "./packContext";
import { useNavigate } from "react-router-dom";
import { compareSync } from "bcryptjs";
//Functional component Declaration
function PackStore({ children }) {
  //State initialization
  let navigate = useNavigate();
  let [currentUser, setCurrentUser] = useState({});
  let [userLoginStatus, setUserLoginStatus] = useState(false);
  let [error, setError] = useState("");

  //Logout handler
  let handleLogout = () => {
    setCurrentUser({});
    setUserLoginStatus(false);
    navigate("/");
  };

  //User Submission handler
  let handleUserSubmit = async (userObj) => {
    const { email, password } = userObj;

    try {
      //checks if the values are provided and then makes a request
      if (!email || !password) {
        setError("Please enter both email and password");
        return;
      }
      const res = await axios.get(`http://localhost:4000/users?email=${email}`);
      console.log(res.data);
      const userData = res.data[0];
      console.log(userData);
      // if user not found
      if (!userData) {
        setError("User not registered.Please register first.");
      }
      //found
      else {
        const isPasswordValid = compareSync(password, userData.password);
        if (!isPasswordValid) {
          setError("Incorrect password. Please enter the correct password");
        } else {
          setCurrentUser(userData);
          setUserLoginStatus(true);
          alert("Login successful");
          setError("");
          navigate("/Details");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // return the Context Provider with specified values
  return (
    <loginContextObj.Provider
      value={{
        handleUserSubmit,
        error,
        userLoginStatus,
        handleLogout,
        currentUser,
      }}
    >
      {children}
    </loginContextObj.Provider>
  );
}

export default PackStore;
