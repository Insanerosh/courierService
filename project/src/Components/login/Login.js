import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { loginContextObj } from "../context/packContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Login() {
  //Destructuring values from loginContextObj
  let { handleUserSubmit } = useContext(loginContextObj);
  let { error } = useContext(loginContextObj);

  //State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to check if a user is registered based on their email
  async function isUserRegistered(email) {
    try {
      const response = await axios.get(
        `http://localhost:4000/users?email=${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Error checking user registration:", error);
      return false;
    }
  }

  //Function to handle login form submission
  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      //Check if the user is registered
      const isRegistered = await isUserRegistered(email);
      // If not registered , show alert
      if (!isRegistered) {
        alert("New user ?? Please register first");
      }
      // If registered, submit the login details
      else {
        let userObj = {
          email: email,
          password: password,
        };
        handleUserSubmit(userObj);
      }
    } catch (error) {
      console.error("Error during login submission:", error);
    }
  }

  return (
    <>
      <Header />
      <div className="lg" style={{ minHeight: "100vh" }}>
        <div className="login-container">
          <h1 className="lo">Login</h1>
          <form className="w-75 mx-auto">
            <div class="form-group">
              <label for="exampleInputEmail1"></label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"></label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            {error.length !== 0 && <p className="text-danger">{error}</p>}
            <button
              type="submit"
              class="btn btn-primary d-block mx-auto mt-4"
              onClick={handleLoginSubmit}
            >
              Submit
            </button>
            <p>
              Not yet registered?? Please{" "}
              <Link to="/Register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
