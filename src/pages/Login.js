import React, { useContext, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { Context } from "../context/Context.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const emailRef = useRef();
  //const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      //API call
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log(res.data);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data.data.token));
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error("Wrong Credentials");
    }
  };
  console.log(user);
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
            to="/register"
            style={{
              color: "#fff",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            REGISTER
          </NavLink>
        </MDBBtn>
      </div>
      <p className="fs-3 mt-10">LOGIN</p>
      <MDBInput
        className="mb-4  align-items-center justify-content-center w-200px"
        type="email"
        name="email"
        id="formEmail"
        label="Email address"
        //ref={emailRef}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        id="formPassword"
        label="Password"
        //ref={passwordRef}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <MDBBtn
        color="success"
        type="submit"
        block
        style={{ backgroundColor: "rgba(57, 192, 237, 0.6)" }}
        disabled={isFetching}
      >
        Login
      </MDBBtn>
    </form>
  );
}
