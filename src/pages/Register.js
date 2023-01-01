import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/auth/register`,
        {
          username,
          email,
          password,
          passwordConfirm,
          photo,
        }
      );
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.token));
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
      <div className="position-absolute start-100 top-0">
        <MDBBtn
          type="submit"
          block
          style={{ backgroundColor: "rgba(249, 49, 84, 0.6)" }}
        >
          <NavLink
            to="/login"
            style={{
              color: "#fff",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            LOGIN
          </NavLink>
        </MDBBtn>
      </div>
      <p className="fs-3 mt-10">REGISTER</p>
      <MDBInput
        className="mb-4  align-items-center justify-content-center w-200px"
        type="username"
        id="formUsername"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <MDBInput
        className="mb-4  align-items-center justify-content-center w-200px"
        type="email"
        id="formEmail"
        label="Email address"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <MDBInput
        className="mb-4"
        type="password"
        id="formPassword"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <MDBInput
        className="mb-4"
        type="password"
        id="formPasswordConfirm"
        label="Password Confirm"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
      />
      <div
        style={{
          marginBottom: "4px",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
        }}
      >
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => {
            setPhoto(base64);
          }}
        />
      </div>

      <MDBBtn
        color="success"
        type="submit"
        block
        style={{ backgroundColor: "rgba(57, 192, 237, 0.6)" }}
      >
        Register
      </MDBBtn>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!!!
        </span>
      )}
    </form>
  );
}
