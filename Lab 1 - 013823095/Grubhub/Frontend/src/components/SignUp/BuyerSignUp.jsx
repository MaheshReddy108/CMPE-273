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

class BuyerSignUp extends Component {
  
    constructor(props) {
      
      super(props);
      this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            isNewUserCreated: false,
            validationError:  false,
            errorRedirect: false
      };
      
      this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
      this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
      this.emailChangeHandler = this.emailChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.signup = this.signup.bind(this);
      
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

    passwordChangeHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
    }

    signup = (e) => {

        var data = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            Password: this.state.Password
        }

        if (this.state.FirstName == "" || this.state.LastName == "" || this.state.Email == "" || this.state.Password == "") {
            this.setState({
                validationError: true
            });
        }
        else {

            e.preventDefault();

            axios.defaults.withCredentials = true;

            axios.post('http://localhost:3001/Buyer-signup', data)
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
            redirectVar = "User Already exists!!"
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
              <div className="alert alert-danger" role="alert">
                {redirectVar}
                </div>
                <div>
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
                <button class="btn btn-primary btn-sm" type="submit" style={{width:"100px", height:"40px"}}><Link to="/login" style={{ color:"white"}}>
                     Login
                    </Link>
                  </button>
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
              <br/>
              <br/>
              <div class="form-row">
                <button onClick={this.signup} class="btn btn-primary btn-sm" type="submit">
                  Create My Account
                </button>
              </div>
              <br/>
              <button class="btn btn-primary btn-sm" type="submit" style={{width:"100px", height:"40px"}}><Link to="/login" style={{ color:"white"}}>
                  Login
                  </Link>
                </button>
              </div>
            </>

        )
    }
}

export default BuyerSignUp;