import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavLink className="text-decoration-none p-2" style={{ color: "white", fontSize: "26px" }} to='/'>CRUD_Table</NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="text-decoration-none p-2" style={{ color: "white" }} to='/'>Home</NavLink>
              <NavLink className="text-decoration-none p-2" style={{ color: "white" }} to='/register'>Register</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
