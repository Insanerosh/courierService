import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { loginContextObj } from "../context/packContext";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
function Checkout() {
  let { currentUser } = useContext(loginContextObj);
  const navigate = useNavigate();
  let name = currentUser.username;
  console.log(name);
  let [data, setData] = useState({});
  let userData = {};

  const getData = async () => {
    try {
      let res = await axios.get(`http://localhost:4000/details?name=${name}`);
      userData = res.data[0];
      console.log(res.data);
      setData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = () => {
    navigate("/Confirmation");
  };

  return (
    <>
      <Header />
      <div className="check-form" style={{ minHeight: "100vh" }}>
        <div className="check-container">
          <h2 className="text-center text-danger">
            <strong>Check Out</strong>
          </h2>
          <div class="row">
            <div class="col">
              <h4>Customer Name:</h4>
              <h4>Content Weight:</h4>
              <h4>Content Name:</h4>
              <h4>Service Choosen:</h4>
              <h4>Booking Opted:</h4>
              <h4>Total Amount to Pay:</h4>
            </div>
            <div class="col">
              <h4>{data.name}</h4>
              <h4>{data.weight}Kg</h4>
              <h4>{data.content}</h4>
              <h4>{data.service}</h4>
              <h4>{data.booking}</h4>
              <h4>{data.price}</h4>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-success d-block btn-lg  mx-auto mt-2"
            onClick={handleButtonClick}
          >
            Confirm
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
