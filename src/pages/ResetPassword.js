import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `https://react-blog-app-backend.onrender.com/auth/resetpassword/${token}`,
        { password, passwordConfirm }
      );
      console.log(res.data);
      if (res.data) {
        // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        // localStorage.setItem("user", JSON.stringify(res.data.data.token));
        navigate("/login");
      }
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
      <p className="fs-3 mt-10">RESET PASSWORD</p>
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        id="formPassword"
        label="NewPassword"
        //ref={passwordRef}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        id="formPassword"
        label="NewPasswordConfirm"
        //ref={passwordRef}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
      />
      <MDBBtn
        color="success"
        type="submit"
        style={{ backgroundColor: "rgba(57, 192, 237, 0.6)" }}
      >
        Reset
      </MDBBtn>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!!!
        </span>
      )}
    </form>
  );
}
