import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axios from "axios";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://react-blog-app-backend.onrender.com/auth/forgotpassword`,
        {
          email,
        }
      );
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <form
      className="mt-5 w-25 align-items-center mx-auto position-relative"
      onSubmit={handleSubmit}
    >
      {/* <div className="position-absolute start-100 top-0"></div> */}
      <p className="fs-3 mt-10">FORGOT PASSWORD</p>

      <MDBInput
        className="mb-4  align-items-center justify-content-center w-200px"
        type="email"
        id="formEmail"
        label="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <MDBBtn
        color="success"
        type="submit"
        block
        style={{ backgroundColor: "rgba(57, 192, 237, 0.6)" }}
      >
        Send Reset Code
      </MDBBtn>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!!!
        </span>
      )}
    </form>
  );
}
