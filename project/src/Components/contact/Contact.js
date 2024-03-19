import React from "react";
import "./Contact.css";
import Header from "../header/Header";

function Contact() {
  return (
    <>
    <Header/>
    <div>
      <div className="con" style={{ minHeight: "100vh" }}>
        <h2>Contact QuickPack Courier Service</h2>
        <p className="p1">
          For urgent inquiries, you can also reach us at
          <strong>(8341767411)</strong>.
        </p>

        <p className="p2">
          <em>QuickPack - Swift, Secure, Reliable.</em>
        </p>        
      </div>

    </div>
    </>
  );
}

export default Contact;
