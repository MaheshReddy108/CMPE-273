
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfileIn } from "../reducers/auth.action2";
import { Redirect } from "react-router";
import cookie from 'react-cookies';
import React, { Component } from "react";
import DisplayProperties from './DisplayProperties';



// import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Row,Col} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Navbar';


class  UserSearchPage extends Component {

  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);

    //maintain the state required for this component
    this.state = {
      email: "",
      password: ""
    };
    this.logout=this.logout.bind(this);
    this.AccountHandler=this.AccountHandler.bind(this);
  } 

   logout = e => {
    localStorage.clear();
    window.location.href = "/";
  };

   AccountHandler = e =>{
    e.preventDefault();
    var headers = new Headers();

    const data = {
      email: "",
      password: ""
    };

    //axios
      //.post("http://localhost:3500/profile", data)
      //.then(response => {
        //  this.props.viewProfileIn({ isLoggedIn: true, userName:" " });
         // if (response.data === "Successful Login") {
           // this.setState({
             // authFlag: true
            //});
            //this.props.setLoggedIn({ isLoggedIn: true, userName:" " });
          //} else if (response.data === "Invalid crdentials") {
           // this.setState({
           //   authFlag: false
            //});
          //}
        
      //})
      //.catch(error => {
        
      //});
  }
  render() {
    let redirectVar = null;
    let text;
    const authFlag = this.state.authFlag;

    if(!cookie.load('cookie')){
      redirectVar = <Redirect to="/login" />
  }

  
  if(this.props.isSearch){
      redirectVar = <Redirect to="/display-properties" />
  }

    if (authFlag === true) {
      return <Redirect to="/UserSearchPage" />;
    } else if (authFlag === false) {
      text = (
        <p className="text-danger">
          Hey Stranger! We don't recognize that login. Spell check your info and
          try again!
        </p>
      );
    }
    return (
     <div>
      
      
      <Row>
        <Col>
         .
        </Col>
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
        <Col>
          .
        </Col>
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
        
        
        
        <Col>
           <Button variant="danger" href="#home">GRUBHUB</Button>
        </Col>
        <Col ml="auto"></Col>
        {/* <Col md="auto"></Col>
        <Col md="auto"></Col>
        <Col md="auto"></Col>
        <Col md="auto"></Col> */}

        <Form inline style={{"margin-left":"1rem"}}>
           <FormControl type="text" placeholder="Pizza" className="mr-sm-2"  name="searchText" onChange={this.props.handleInputChange}/>
           <Button variant="primary" onClick={this.props.searchClick} style={{"color":"white"}}>Find </Button>
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
        
        
        
      <Col>
        <NavDropdown title="Hi" id="basic-nav-dropdown">
          <NavDropdown.Item ><Link>Past orders</Link></NavDropdown.Item>
          <NavDropdown.Item >Upcoming Orders</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.AccountHandler}><Link to="/dashboard">Account</Link></NavDropdown.Item>
          <NavDropdown.Item href="#" onClick={this.logout}>
                  LogOut
          </NavDropdown.Item>
        </NavDropdown>
      </Col>


 <br></br>
 <br></br>
 {/* <br></br> */}

             <img src= {'https://res.cloudinary.com/grubhub-marketing/image/upload/f_auto,fl_lossy,q_80/v1538431627/Homepage_Desktop_0018_Pizza_2x_qshvvo.jpg'} style={{width:1200,height:400}}/>
           
        
       
      </Row>
    </div>
  );
}
}

const mapDispatchProps = {
  viewProfileIn: setUserProfileIn
};

export default connect(
  null,
  mapDispatchProps
)(UserSearchPage);


