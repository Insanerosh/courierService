import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './UserRegistration.css'
import axios from "axios";
import {hashSync} from 'bcryptjs' 
import Header from "../header/Header";
import Footer from "../footer/Footer";
 //Functional component 
function UserRegistration() {
  let [userName,setUserName] = useState()
 let [email,setEmail] = useState()
 let [password,setPassword] = useState()
 let [telephone,setTelephone] = useState()
 let [errors, setErrors] = useState({});
  
 let navigate=useNavigate();

  async function handleFormSubmit(event){
    event.preventDefault();

  if (!validateForm()){
    return;
  }
     //hash the password
     let hashedPassword =  hashSync(password,5)
     // replace plain password with hashed password

  let userData = {}
  userData.username = userName;
  userData.email = email;
  userData.password = hashedPassword;
  userData.telephone = telephone;
   try{ 
    //check if user with the same email already exists
        const existingUser=await axios.get(`http://localhost:4000/users?email=${email}`);
        if (existingUser.data.length > 0){
        alert("User already exists.Please login")
      } else{
        //If user doesn't exist, register the new user
        await axios.post("http://localhost:4000/users",userData);
        alert ("registered successfully.redirecting to login page.");
        navigate("/Login")
      }
       
      } catch (error){
        console.log(error)
      }
  }

  //Function to validate the form and set errors
  function validateForm(){
    const formErrors = {};

    if ( !userName || !userName.trim()){
      formErrors.username = <strong>Please enter your name</strong>
    }

    if (!email || !email.trim()){
      formErrors.email = <strong>Please enter your email</strong>
    }else if (!validateEmail(email)){
      formErrors.email = <strong>Please enter a valid email address</strong>
    }
     
    if (!telephone || !telephone.trim()){
      formErrors.telephone = <strong>Please enter your phone number</strong>
    }else if (!validateTelephone(telephone)){
      formErrors.email = <strong>Please enter a valid phone number</strong>
    }

    if (!password || !password.trim()){
      formErrors.password = <strong>Please enter your password</strong>
    }else if (password.length<6){
      formErrors.password = <strong>Password must be atleast 6 characters</strong>
    }
   

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  }

  function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  }

  function validateTelephone(telephone) { 
    const telephoneRegex = /^\d{10}$/; 
    return telephoneRegex.test(telephone); }

  
 
  return (
    <>
    <Header/>
    <div className='reg' style={{minHeight:'100vh'}}>
    <div className="reg-container">

      <h1 className="text-center">Register</h1>
      <form className="w-75  mx-auto " onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          name="username"
          placeholder="Enter Your Name"
          onChange={(e)=>setUserName(e.target.value)}
        />
        {errors.username && <p className="text-danger lead">{errors.username}</p>}
        
       
        
        <input
          type="text"
          className="form-control mb-3"
          name="email"
          placeholder="Enter Your Email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        {errors.email && <p className="text-danger lead">{errors.email}</p>}
        <input
          type="tel"
          className="form-control mb-3"
          name="telephone"
          placeholder="Enter Your Number"
          onChange={(e)=>setTelephone(e.target.value)}
        />
        {errors.telephone && <p className="text-danger lead">{errors.telephone}</p>}
        <input
          type="password"
          className="form-control mb-3"
          name="password"
          placeholder="Enter Your Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        {errors.password && <p className="text-danger  lead">{errors.password}</p>}
       
        <div className="">
        <button type="submit" className="btn btn-primary d-block mx-auto mb-3" >
          Register 
        </button>
        <p>Already registered?? Please <Link to='/Login'>Login</Link></p>
        </div>
      </form>
      
    </div>
    </div>
    <Footer/>
    </>
  );
}
 
export default UserRegistration;