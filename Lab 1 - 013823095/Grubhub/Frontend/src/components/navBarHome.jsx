import React, { Component } from "react";
import { connect } from "react-redux";

//import { Navbar,NavLink,Link,Nav,NavDropdown } from 'react-router-dom/cjs/react-router-dom.min';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import YourAccount from "./yourAccount";

class NavBarHome extends Component {
  logout = e => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#">GrubHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown
                title="Hi"
                id="collasible-nav-dropdown"
                alignright="true"
              >
                <NavDropdown.Item id="acctInfo" href="/dashboard">
                  Your Account
                </NavDropdown.Item>
                <NavDropdown.Item href="/pastOrders">
                  Past Orders
                </NavDropdown.Item>
                <NavDropdown.Item href="/upcomingOrders">
                  Upcoming Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={this.logout}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
      </div>
    );
  }
}

export default NavBarHome;
