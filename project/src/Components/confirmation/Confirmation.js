import React from "react";
import { useContext } from "react";
import { loginContextObj } from "../context/packContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import("./Confirmation.css");

function Confirmation() {
  let { currentUser } = useContext(loginContextObj);

  return (
    <>
      <Header />
      <div className="confirmation-container" style={{ minHeight: "100vh" }}>
        <div className="confirmation-form">
          <h2 className="onum text-center ">
            <strong>Order Confirmation</strong>
          </h2>
          <div className="onump text-dark">
            <p className="onumpp">Dear {currentUser.username},</p>
            <p>Thank you for choosing our Quick Pack Courier Service!</p>
            <p>Your order has been successfully processed.</p>
            <p>Contact Customer Support for Assistance: 8341767411</p>
            <p>
              We appreciate your business and look forward to serving you again.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Confirmation;
