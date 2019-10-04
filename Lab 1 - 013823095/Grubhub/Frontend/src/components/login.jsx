import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { setUserLoggedIn } from "../reducers/auth.actions";
import { commonStyle } from "./commonStyle.css";
import Card from '@material-ui/core/Card';
import BuyerSignUp from "./SignUp/BuyerSignUp";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      selectedOption:"",

      formValidationFailure:"",
      isValidationFailure: "",
      errorRedirect: ""
    };
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailhangeHandler = this.emailChangeHandler.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: ""
    });
  }

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };


  validate = e => {
    window.addEventListener(
      "load",
      function() {
        var forms = document.getElementsByClassName("needs-validation");
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "login",
            function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  };

  login = e => {

        var data = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.email == "" || this.state.password == "") {

            this.setState({
                formValidationFailure: true
            });

            console.log('Form Error!');

        }
        else {
            axios.defaults.withCredentials = true;



            axios.post('http://localhost:3001/login', data)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            isValidationFailure: true,
                            formValidationFailure: false
                        })
                    }

                })
                .catch((err) => {
                    if (err) {
                        if (err.response.status === 401) {
                            this.setState({
                                isValidationFailure: false
                            })
                            console.log("Error messagw", err.response.status);
                        }
                        else {
                            this.setState({
                                errorRedirect: true
                            })
                        }
                    }

                });
        }

    }


  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log("errors -" + errors);
    if (errors) return;

    this.login();
  };

  render() {
    let redirectVar = null;
    let text;
    const authFlag = this.state.authFlag;
    if (this.state.selectedOption === "owner"){
      redirectVar = <Redirect to="/OwnerSignUp" />
    }else if(this.state.selectedOption === "buyer"){
      redirectVar = <Redirect to="/BuyerSignUp" />
    }

    let errorPanel = null;
    if (this.state.isValidationFailure === false) {
            errorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Invalid Credentials!!!
                </div>
            </div>
    }
    if (this.state.isValidationFailure === true) {
      redirectVar = <Redirect to="/UserSearchPage" />
    }
    

    let formErrorPanel = null;
        console.log('FormvalidationFailur', this.state.formValidationFailure);
        if (this.state.formValidationFailure) {
            formErrorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password are required!
        </div>
            </div>
        }

    // let invalidAccountCreation = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/welcomePage" />;
    // }
    return (
     <Card> 
      <form 
        className="needs-validation novalidate"
        onSubmit={this.handleSubmit}
      >
        {text}
        {redirectVar}
        <div className="outer-container" >
          <div className="inner-container">
            <div className="form-group">
              <h3 className="text-danger font-weight-bold fixed-top top-left title-padding">
                GRUBHUB - Order Food Online
              </h3>
            </div>
          </div>
          <div>{text}</div>
          <div className="inner-container content-form-padding">
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                onChange={this.emailChangeHandler}
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter email"
                required
              />
              <div className="invalid-feedback">Email is required</div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword1">Password</label>
              <input
                onChange={this.passwordChangeHandler}
                type="password"
                className="form-control"
                id="inputPassword1"
                placeholder="Password"
                required
              />
              <div className="invalid-tooltip">password is required</div>
              <div className="invalid-feedback">Password is required</div>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="Check" />
              <label
                onChange={this.emailChangeHandler}
                className="form-check-label"
                htmlFor="Check"
              >
                Keep me signed In
              </label>
            </div>
            <br />
            <div>
              <button
                //onClick={this.login}
                type="submit"
                className="btn btn-primary"
              >
                Sign In
              </button>
              <br />
              <br />
              <div className="form-group">Don't Have an account?</div>
              <div className="form-row"></div>
              <div className="form-col">
              <div class="form-check">
                 <input
                    onChange={this.handleOptionChange}
                    class="form-check-input"
                    type="radio"
                    name="createBuyerAccount"
                    id="createBuyerAccount"
                    value="buyer"
                    checked={this.state.selectedOption === "buyer"}
                  />
                  <label class="form-check-label" for="createBuyerAccount">
                    Buyer Account
                  </label>
              </div>
              </div>
              <div className="form-col">
                 <div class="form-check">
                   <input
                      onChange={this.handleOptionChange}
                      class="form-check-input"
                      type="radio"
                      name="createOwnerAccount"
                      id="createOwnerAccount"
                      value="owner"
                      checked={this.state.selectedOption === "owner"}
                   />
                   <label class="form-check-label" for="createOwnerAccount">
                       Owner Account
                   </label>
                 </div>
              </div>
              </div>
              <div className="form-group">
                <a href="/createAccount">Create Account</a>
              </div>
              {errorPanel}
              {formErrorPanel}
            </div>
            
        </div>
      </form>
      </Card>
    );
  }
}

const mapDispatchProps = {
  setLoggedIn: setUserLoggedIn
};

export default connect(
  null,
  mapDispatchProps
)(Login);
