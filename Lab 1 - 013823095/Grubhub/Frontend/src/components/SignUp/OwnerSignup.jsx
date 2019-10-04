import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
//import { commonStyle } from "./commonStyle.css";
import { connect } from "react-redux";
//import { setUserSignedUp } from "../../reducers/auth.action1";
import { Dropdown } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';

class OwnerSignUp extends Component {

    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Cuisine:"",
            Password: "",
            RestaurantName:"",
            RestaurantAddress:"",
            RestaurantPhoneNumber:"",
            RestaurantZipcode: "",
            Locations: "",
            isNewUserCreated: false,
            validationError:  false,
            errorRedirect: false
        }

      this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
      this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
      this.emailChangeHandler = this.emailChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
      this.locationChangeHandler = this.locationChangeHandler.bind(this);
      this.signup = this.signup.bind(this);

      this.restaurantNameChangeHandler = this.restaurantNameChangeHandler.bind(this);
      this.restaurantAddressChangeHandler = this.restaurantAddressChangeHandler.bind(this);
      this.restaurantPhoneNumberChangeHandler = this.restaurantPhoneNumberChangeHandler.bind(this);
      this.RestaurantZipcodeChangeHandler = this.RestaurantZipcodeChangeHandler.bind(this);
    }

    firstnameChangeHandler = (e) => {
        this.setState({
            FirstName: e.target.value
        })
    }

    lastnameChangeHandler = (e) => {
        this.setState({
            LastName: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            Email: e.target.value
        })
    }

    cuisineChangeHandler = (e) => {
      this.setState({
          Cuisine: e.target.value
      })
  }
    
    locationChangeHandler = (e) => {
      this.setState({
          Locations: e.target.value
      })
  }
    passwordChangeHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
    }
    
    restaurantNameChangeHandler = (e) => {
        this.setState({
            RestaurantName: e.target.value
        })
    }
    
    restaurantAddressChangeHandler = (e) => {
        this.setState({
            RestaurantAddress: e.target.value
        })
    }

    restaurantPhoneNumberChangeHandler = (e) => {
        this.setState({
            RestaurantPhoneNumber: e.target.value
        })
    }

    RestaurantZipcodeChangeHandler = (e) => {
        this.setState({
            RestaurantZipcode: e.target.value
        })
    }
    

    signup = (e) => {

        var data = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            Password: this.state.Password,
            Cuisine: this.state.Cuisine,
            Locations: this.state.Locations,
            RestaurantName: this.state.RestaurantName,
            RestaurantAddress: this.state.RestaurantAddress,
            RestaurantPhoneNumber: this.state.RestaurantPhoneNumber,
            RestaurantZipcode: this.state.RestaurantZipcode
        }

        if (this.state.FirstName == "" || this.state.LastName == "" || this.state.Email == "" || this.state.Password == "" || this.state.RestaurantAddress == "" || this.state.RestaurantName == "" || this.state.RestaurantPhoneNumber == "" || this.state.RestaurantZipcode == "") {
            this.setState({
                validationError: true
            });
        }
        else {

            e.preventDefault();

            axios.defaults.withCredentials = true;

            axios.post('http://localhost:3001/Owner-signup', data)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            isNewUserCreated: true
                        })
                    }
                    else {
                        this.setState({
                            isNewUserCreated: false
                        })
                    }
                })
                .catch((err)=>{
                    if(err){
                        this.setState({
                            errorRedirect: true
                        });
                    }
                });
        }
    }

    render(){
        let redirectVar = null;
        if (this.state.isNewUserCreated === true) {
            redirectVar = <Redirect to="/login" />
        }

        if (this.state.errorRedirect === true) {
            redirectVar = <Redirect to="/error" />
        }

        let errorAlert = null;
        if(this.state.validationError){
            errorAlert = <div>
            <div className="alert alert-danger" role="alert">
                <strong>Error!</strong> Fill all the fields to proceed!
            </div>
        </div>
        }

        return(
            <>
              <div className="container fill-graywhite">
                {redirectVar}
                <div>
                    {errorAlert}
                </div>
               <div className="form-row container">
                  <h3 className="text-danger font-weight-bold fixed-top top-left title-padding">
                     GrubHub
                  </h3>
               </div>
               <div className="form-row">
                  <h5>
                    <span>Create Your Account</span>
                  </h5>
               </div>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="inputFirstname">First name</label>
                  <input
                    onChange={this.firstnameChangeHandler}
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="First name"
                    required
                  />
                  <div class="invalid-feedback">First Name is Required.</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label htmlFor="inputLastname">Last name</label>
                  <input
                    onChange={this.lastnameChangeHandler}
                    type="text"
                    class="form-control"
                    id="inputLastname"
                    placeholder="Last name"
                    required
                  />
                  <div class="invalid-feedback">Last Name is Required.</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label htmlFor="inputLastname"></label>
                  <button class="btn btn-primary btn-sm" type="submit" style={{width:"100px", height:"40px"}}><Link to="/login" style={{ color:"white"}}>
                     Login
                    </Link>
                  </button>
                </div>
              </div>
              <div class="form-row">
                <label for="customerEmail">Email</label>
                <div class="input-group">
                  <input
                    onChange={this.emailChangeHandler}
                    type="email"
                    class="form-control"
                    id="customerEmail"
                    placeholder="Email"
                    required
                  />
                  <div class="invalid-feedback">Email is required.</div>
                </div>
              </div>
              <div class="form-row">
                <label for="customerPassword">Password</label>
                <div class="input-group">
                  <input
                    onChange={this.passwordChangeHandler}
                    type="password"
                    class="form-control"
                    id="customerPassword"
                    placeholder="Password"
                    required
                  />
                  <div class="invalid-feedback">Password is Required.</div>
                </div>
              </div>
              
              <div>
                    <div class="form-row">
                      <label for="restrauntName">Restauraunt Name</label>
                      <div class="input-group">
                        <input
                          onChange={this.restaurantNameChangeHandler}
                          type="text"
                          class="form-control"
                          id="restrauntName"
                          placeholder="Restraunt Name"
                          required
                        />
                        <div class="invalid-feedback">
                          Restraunt Name is Required for Owner Account.
                        </div>
                      </div>
                      <br/>
                      <br/>
                      <label>
                           Restaurant Address:
                      </label>
                      <div>
                      <TextField onChange={this.restaurantAddressChangeHandler} style={{width:"600px"}} variant="outlined">
                      </TextField>
                      </div>
                    </div>
                    <label>
                           Cuisine:
                      </label>
                      <div>
                      <TextField onChange={this.cuisineChangeHandler} style={{width:"600px"}} variant="outlined">
                      </TextField>
                      </div>
                    <div>
                           Restaurant Phone Number:
                    </div>
                    <TextField onChange={this.restaurantPhoneNumberChangeHandler} style={{width:"200px"}} variant="outlined">
                    </TextField>
                    <div class="form-row">
                      <label for="restrauntZipCode">Restauraunt Zip Code</label>

                      <div class="input-group">
                        <input
                          onChange={this.RestaurantZipcodeChangeHandler}
                          type="text"
                          class="form-control"
                          id="restrauntZip"
                          placeholder="Restraunt Zip Code"
                          required
                        />
                        <div class="invalid-feedback">
                          Restraunt Zip Code is Required for Owner Account.
                        </div>
                        </div>
                        <div>
                           how many locations are you signing up?
                        </div>
                        
                        <Typography paragraph>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" onChange={this.locationChangeHandler}>
                                1
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                               <Dropdown.Item href="">1</Dropdown.Item>
                               <Dropdown.Item href="">2</Dropdown.Item>
                               <Dropdown.Item href="">3</Dropdown.Item>
                               <Dropdown.Item href="">4</Dropdown.Item>
                               <Dropdown.Item href="">5</Dropdown.Item>
                               <Dropdown.Item href="">6</Dropdown.Item>
                               <Dropdown.Item href="">7</Dropdown.Item>
                               <Dropdown.Item href="">8</Dropdown.Item>
                               <Dropdown.Item href="">9</Dropdown.Item>
                               <Dropdown.Item href="">10</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <br/>
                        </Typography>
                    </div>
                  </div>
                  <br/>
                  <br/>
              <div class="form-row">
                <button onClick={this.signup} class="btn btn-primary btn-sm" type="submit">
                  Create My Account
                </button>
              </div>
              </div>
            </>

        )
    }
}

export default OwnerSignUp;