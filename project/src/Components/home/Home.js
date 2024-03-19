import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./Home.css";
function Home() {
  return (
    <>
      <Header />
      <h1 className="headin display-6">
        <strong>Your Package,Our Priority,Always on time</strong>
      </h1>
      <div className="bgimg" style={{ minHeight: "90vh" }}>
        <NavLink to="./Login">
          <button type="button" class="btn btn-danger">
            Book Shipment
          </button>
        </NavLink>
      </div>

      <Footer />
    </>
  );
}

export default Home;
