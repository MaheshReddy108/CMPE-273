import React from 'react';
import ReactDOM from 'react-dom';

// import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Row,Col} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Navbar';

const Example = (props) => {
  return (
    <div>
      <Row>
      <Navbar bg="light" expand="lg">
        <Col>
  <Button variant="danger" href="#home">GRUBHUB</Button>
  </Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  
    <Form inline>
      <FormControl type="text" placeholder="Pizza" className="mr-sm-2" />
      <Button variant="primary">Find</Button>
    </Form>
    <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>



  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  <Col md="auto"></Col>
  
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Hii Mahesh" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Past orders</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Upcoming Orders</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Account </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</Row>
    </div>
  );
};

export default Example;

