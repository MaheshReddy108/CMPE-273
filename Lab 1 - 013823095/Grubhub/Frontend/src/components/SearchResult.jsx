import React from 'react';
import ReactDOM from 'react-dom';
// import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
 import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Row,Col} from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/Card';
import {
    Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';
import img from './Indian.png';
import img1 from './pizza.png';
import img2 from './burger.png';
import Sidebar from "./Sidebar";

const Search = ()=>{
    return(
    <>
        <Sidebar
          
        />
        <div>
            <Row></Row>
            <col md></col>
        <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <Col>
         .
        </Col>
        
        <Col md="auto"></Col>
        <Col md="auto"></Col>
        <Col md="auto"></Col>

  <NavDropdown title="Cusine" id="basic-nav-dropdown">
  <NavDropdown.Item href="#action/3.1">American</NavDropdown.Item><NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.2">Breakfast</NavDropdown.Item><NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.2">Pizza</NavDropdown.Item><NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.2">Lunch specials</NavDropdown.Item><NavDropdown.Divider />
        </NavDropdown>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
    
 {/* <Card style={{ width: '18rem' }}>
  <Card.Img variant="bottom" src={img} />
  <Card.Body>
    <Card.Title>Indian Restaurant</Card.Title>
    <Card.Text>
    <li>American</li>
    <li>breakfast</li>
    </Card.Text>
    <Button variant="primary">Visit</Button>
  </Card.Body>
</Card>  */}
{/* <CardGroup>
    <Card>
<Card style={{ width: '18rem' }}>
  <Card.Img variant="bottom" src={img} />
  <Card.Body>
    <Card.Title>Indian Restaurant</Card.Title>
    <Card.Text>
    <li>American</li>
    <li>breakfast</li>
    </Card.Text>
    <Button variant="primary">Visit</Button>
  </Card.Body>
</Card>  
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardGroup>
     */}
     <CardDeck>
      <Card>
        <CardImg top width="100%" src={img} alt="Card image cap" />
        <CardBody>

          <CardText>INDIAN HUB</CardText>
          <li>Lunch</li>
          <li>Appateziers</li>
          <li>Breakfast</li>
          <br>
          </br>
          <Button>Visit</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src={img1} alt="Card image cap" />
        <CardBody>
          <CardText>PIZZA HUT</CardText>
          <li>American</li>
          <li>Appateziers</li>
    <li>breakfast</li> <br></br>
          <Button>visit</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src={img2} alt="Card image cap" />
        <CardBody>
          <CardText>BURGER KING</CardText>
          <li>American</li>
    <li>breakfast</li> <br></br>
          <Button>Visit</Button>
        </CardBody>
      </Card>
    </CardDeck>
    <NavDropdown title="Cusine" id="basic-nav-dropdown">
  <NavDropdown.Item href="#action/3.1">American</NavDropdown.Item><NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.2">Breakfast</NavDropdown.Item><NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.2">Pizza</NavDropdown.Item><NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.2">Lunch specials</NavDropdown.Item><NavDropdown.Divider />
        </NavDropdown>

           </div>
           </>
    );
};

export default Search;