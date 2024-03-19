import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import UserRegistration from "../user/UserRegistration";
function Register() {
  let [userName, setUserName] = useState();
  let [mail, setMail] = useState();
  let [password, setPassword] = useState();
  let [telephone, setTelephone] = useState();

  // eslint-disable-next-line no-unused-vars
  let handleSubmit = async (e) => {
    e.preventDefault();

    let userData = {};
    userData.username = userName;
    userData.email = mail;
    userData.password = password;
    userData.telephone = telephone;

    let res = await axios.post("http://localhost:4000/users", userData);

    if (res.status === 201) {
      alert("registration success");
      setUserName("");
      setMail("");
      setPassword("");
      setTelephone("");

      Navigate("/login");
    }
  };
  return (
    <div>
      <UserRegistration />
    </div>
  );
}

export default Register;
