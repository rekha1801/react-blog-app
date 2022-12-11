import "./App.css";
import React, { useContext, useState } from "react";
import { Routes, BrowserRouter, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import SingleBlog from "./pages/SingleBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import { Context } from "./context/Context.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";

function App() {
  const [show, setShow] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };
  console.log(user?.data);
  return (
    <BrowserRouter>
      <div className="App">
        <h2>Blogs</h2>
        <div>
          <MDBNavbar
            expand="lg"
            id="navbarRightAlignExample"
            light
            style={{ backgroundColor: "#4C8184" }}
          >
            <MDBContainer fluid>
              <MDBNavbarBrand href="/">
                <img
                  src="/images/images.jpeg"
                  alt="Logo"
                  style={{
                    height: "50px",
                    width: "150px",
                    borderRadius: "10px",
                  }}
                />
              </MDBNavbarBrand>
              <MDBNavbarNav className="ms-auto mb-2 mb-lg-0 d-flex input-group w-auto">
                <MDBNavbarItem className="active px-5">
                  <h5>Welcome {user?.data.username}!</h5>
                </MDBNavbarItem>
              </MDBNavbarNav>
              <MDBNavbarToggler
                type="button"
                data-target="#navbarColor02"
                aria-controls="navbarColor02"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ color: "#fff" }}
                onClick={() => setShow(!show)}
              >
                <MDBIcon icon="bars" fas />
              </MDBNavbarToggler>

              <MDBCollapse show={setShow} navbar>
                <MDBNavbarNav className="ms-auto mb-2 mb-lg-0 d-flex input-group w-auto">
                  {/* <MDBNavbarItem className="active px-5">
                    {user?.data.photo} <h3>Welcome</h3>
                    {user?.data.username}
                  </MDBNavbarItem> */}
                  <MDBNavbarItem className="active px-3 me-2">
                    <NavLink
                      aria-current="page"
                      to="/"
                      style={{
                        color: "#fff",
                        padding: "10px",
                      }}
                    >
                      HOME
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink
                      to="/addblog"
                      style={{
                        color: "#fff",
                        padding: "10px",
                      }}
                    >
                      ADD BLOG
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink
                      to="/about"
                      style={{
                        color: "#fff",
                        padding: "10px",
                      }}
                    >
                      ABOUT
                    </NavLink>
                  </MDBNavbarItem>
                  {user ? (
                    <MDBNavbarItem>
                      <MDBCol size="3">
                        <NavLink
                          to="/login"
                          style={{
                            color: "#fff",
                            padding: "10px",
                          }}
                        >
                          <MDBBtn
                            style={{
                              color: "#fff",
                              padding: "10px",
                              marginRight: "80px",
                              backgroundColor: "#4C8184",
                            }}
                            onClick={handleLogout}
                          >
                            LOGOUT
                          </MDBBtn>
                        </NavLink>
                      </MDBCol>
                    </MDBNavbarItem>
                  ) : (
                    <>
                      <MDBNavbarItem>
                        <MDBCol size="3">
                          <NavLink to="/login">
                            <MDBBtn
                              style={{
                                color: "#fff",
                                padding: "10px",
                                marginLeft: "30px",
                                backgroundColor: "#4C8184",
                              }}
                            >
                              LOGIN
                            </MDBBtn>
                          </NavLink>
                        </MDBCol>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBCol size="3">
                          <NavLink to="/register">
                            <MDBBtn
                              style={{
                                color: "#fff",
                                padding: "10px",
                                marginLeft: "30px",
                                backgroundColor: "#4C8184",
                              }}
                            >
                              REGISTER
                            </MDBBtn>
                          </NavLink>
                        </MDBCol>
                      </MDBNavbarItem>
                    </>
                  )}
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/addblog" element={user ? <AddEdit /> : <Login />} />
          <Route
            path="/editblog/:id"
            element={user ? <AddEdit /> : <Login />}
          />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
