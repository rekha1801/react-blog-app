import "./App.css";
import React, { useState } from "react";
import { Routes, BrowserRouter, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import SingleBlog from "./pages/SingleBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Login from "./pages/Login";
// import { signOut } from "firebase/auth";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";
// import { auth } from "./firebase";
// import CreatePost from "./pages/CreatePost";

function App() {
  const [show, setShow] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);

  // const signUserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     setIsAuth(false);
  //     window.location.pathname = "/login";
  //   });
  // };
  return (
    <BrowserRouter>
      <div className="App">
        <h2>React-Blog-App</h2>
        <div>
          <MDBNavbar expand="lg" light style={{ backgroundColor: "#8bc34a" }}>
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
                <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                  <MDBNavbarItem className="active">
                    <NavLink
                      aria-current="page"
                      to="/"
                      style={{ color: "#fff", padding: "10px" }}
                    >
                      Home
                    </NavLink>
                  </MDBNavbarItem>
                  {/* <MDBNavbarItem>
                    {!isAuth ? (
                      <NavLink
                        to="/login"
                        style={{ color: "#fff", padding: "10px" }}
                      >
                        Login
                      </NavLink>
                    ) : (
                      <button onClick={signUserOut}>LogOut</button>
                    )}
                  </MDBNavbarItem> */}
                  <MDBNavbarItem>
                    <NavLink
                      to="/addblog"
                      style={{ color: "#fff", padding: "10px" }}
                    >
                      Add Blog
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink
                      to="/about"
                      style={{ color: "#fff", padding: "10px" }}
                    >
                      About
                    </NavLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddEdit />} />
          <Route path="/editblog/:id" element={<AddEdit />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
