import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <MDBNavbar expand="lg" light style={{ backgroundColor: "#009688" }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img
              src="/images/Logo.jpg"
              alt="Logo"
              style={{ height: "50px", width: "150px", borderRadius: "10px" }}
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
              <MDBNavbarItem>
                <NavLink
                  to="/addblog"
                  style={{ color: "#fff", padding: "10px" }}
                >
                  Add Blog
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/about" style={{ color: "#fff", padding: "10px" }}>
                  About
                </NavLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
