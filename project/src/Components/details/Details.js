import React, { useContext, useState } from "react";
import axios from "axios";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import { loginContextObj } from "../context/packContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";
//Function component
function Details() {
  const [weight, setWeight] = useState();
  const [content, setContent] = useState();
  const [service, setService] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [booking, setBooking] = useState();
  const [errors, setErrors] = useState({});

  let { currentUser } = useContext(loginContextObj);

  console.log(currentUser);

  const navigate = useNavigate();

  async function handleDetailsSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let userDatas = {};
    let price = 0;
    try {
      // price calculation based on the user selction
      if (weight <= 10) {
        if (service === "Premium") {
          if (booking === "pickup") {
            price = 900;
          } else if (booking === "dropoff") {
            price = 850;
          }
        } else if (service === "Express") {
          if (booking === "pickup") {
            price = 700;
          } else if (booking === "dropoff") {
            price = 650;
          }
        } else if (service === "Standard") {
          if (booking === "pickup") {
            price = 500;
          } else if (booking === "dropoff") {
            price = 450;
          }
        }
      } else if (weight > 10) {
        if (service === "Premium") {
          if (booking === "pickup") {
            price = 1200;
          } else if (booking === "dropoff") {
            price = 1150;
          }
        } else if (service === "Express") {
          if (booking === "pickup") {
            price = 1050;
          } else if (booking === "dropoff") {
            price = 1000;
          }
        } else if (service === "Standard") {
          if (booking === "pickup") {
            price = 850;
          } else if (booking === "dropoff") {
            price = 800;
          }
        }
      }

      // constructing user data object
      userDatas.name = currentUser.username;
      userDatas.weight = weight;
      userDatas.service = service;
      userDatas.booking = booking;
      userDatas.content = content;
      userDatas.from = from;
      userDatas.to = to;
      userDatas.price = price;

      //sending details to the server
      const data = await axios.post(`http://localhost:4000/details`, userDatas);

      alert("details added");
      console.log(data);
      navigate("/Checkout");
    } catch (error) {
      console.log(error);
    }
  }
  // Function to validate the form and set errors
  function validateForm() {
    const formErrors = {};
    if (!weight) {
      formErrors.weight = "Please enter the weight";
    }

    if (!content) {
      formErrors.content = "Please enter the content";
    }

    if (!service) {
      formErrors.service = "Please select the service";
    }

    if (!from) {
      formErrors.from = "Please enter the origin address";
    }

    if (!to) {
      formErrors.to = "Please enter the destination address";
    }

    if (!booking) {
      formErrors.booking = "Please select a booking option";
    }

    if (!weight || weight < 1 || weight > 20) {
      formErrors.weight = "Please enter a valid weight between 1 and 20Kg ";
    }

    setErrors(formErrors);
    //returns true if there are no errors
    return Object.keys(formErrors).length === 0;
  }

  return (
    <>
      <Header />
      <div className="detail" style={{ minHeight: "230vh" }}>
        <h2 className=" line text-center">
          {" "}
          Hi {currentUser.username}, Please fill your Shipment Details
        </h2>
        <div className="details-form">
          <form className="w-75 mx-auto">
            <div class="form-group">
              <h3 className="text-center">Content Details</h3>
              <label for="formGroupExampleInput">Weight:</label>

              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Enter the weight (in number) of the content "
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <p>
                Note: For shipments above 20Kg please contact our customer care
              </p>
              {errors.weight && <p className="text-danger">{errors.weight}</p>}
            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2">Content:</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter the name of content that needs to be shipped"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <p className="text-danger">{errors.content}</p>
              )}
            </div>

            {/* Services */}
            <h3 className="text-center mt-4">Services</h3>
            <div className="box mt-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="service"
                  id="exampleRadios1"
                  value="Premium"
                  // {service}
                  onChange={(e) => setService(e.target.value)}
                />
                <label
                  class="form-check-label text-light "
                  for="exampleRadios1"
                >
                  Premium
                  <p className="text-dark">
                    Day-definite express and secured deliveries for urgent
                    shipments via air.
                  </p>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="service"
                  id="exampleRadios2"
                  value="Express"
                  // {service}
                  onChange={(e) => setService(e.target.value)}
                />
                <label class="form-check-label text-light" for="exampleRadios2">
                  Express
                  <p className="text-dark">
                    Our Express service optimises the pick-up and drop-off
                    timings to provide you with express delivery at reasonable
                    cost via multi modal logistics
                  </p>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="service"
                  id="exampleRadios3"
                  value="Standard"
                  // {service}
                  onChange={(e) => setService(e.target.value)}
                />
                <label class="form-check-label text-light" for="exampleRadios1">
                  Standard
                  <p className="text-dark">
                    Ideal and secure movement of packages via cost-effective
                    ground network
                  </p>
                </label>
              </div>
              {errors.service && (
                <p className="text-danger">{errors.service}</p>
              )}
            </div>

            {/* Adress */}
            <h3 className="text-center ">Address</h3>
            <div class="form-group">
              <label for="formGroupExampleInput">Origin:</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Enter the origin/shipper address"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              {errors.from && <p className="text-danger">{errors.from}</p>}
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Destination:</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter the destination/consignee address"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />

              {errors.to && <p className="text-danger">{errors.to}</p>}
            </div>

            {/* Booking Option */}

            <h3 className="text-center mt-3">Booking Option</h3>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="booking"
                id="exampleRadios1"
                value={"pickup"}
                onChange={(e) => setBooking(e.target.value)}
              />
              <label
                className="form-check-label text-light "
                for="exampleRadios2"
              >
                Pickup
              </label>
              <p>
                The delivery person reaches to your doorstep to pick up the
                package.Extra Rs.50 applicable for pickup
              </p>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="booking"
                id="exampleRadios2"
                value={"dropoff"}
                onChange={(e) => setBooking(e.target.value)}
              />
              <label class="form-check-label text-light" for="exampleRadios2">
                Dropoff
              </label>
              <p>Drop the package at our nearest store to you.</p>
            </div>
            {errors.booking && <p className="text-danger">{errors.booking}</p>}
            <button
              type="submit"
              class="btn btn-success d-block mx-auto mt-4"
              onClick={handleDetailsSubmit}
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;
