import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className=" p-4 text-center text-dark mt-0">
      <div className="main">
        <p className="heading">
          <i class="fa-brands fa-github"></i>
        </p>
        <p className="heading">
          <i class="fa-solid fa-envelope"></i>
        </p>
        <p className="heading">
          <i class="fa-brands fa-instagram"></i>
        </p>
        <p className="heading">
          <i class="fa-brands fa-linkedin"></i>
        </p>
      </div>
    </div>
  );
}

export default Footer;
