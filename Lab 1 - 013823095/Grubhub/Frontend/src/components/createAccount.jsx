import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { commonStyle } from "./commonStyle.css";
import { connect } from "react-redux";
import { setUserSignedUp } from "../reducers/auth.action1";
import { Dropdown } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class CreateAccount extends Component {
  
  constructor(props) {
    
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      selectedOption: "",
      ownerAccountFlag: false
    };

    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailhangeHandler = this.emailChangeHandler.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: ""
    });
  }

  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };

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

  login = e => {
    var headers = new Headers();
    //prevent page from refresh
    // e.preventDefault();

    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.selectedOption
    };
    //set the with credentials to true
    //axios.defaults.withCredentials = true;
    //make a post request with the user data

    axios
      .post("http://localhost:3500/register", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log(response);
        if (response.status === 200) {
          console.log("Register Request successful");
          if (response.data === "User registered successfully") {
            this.setState({
              authFlag: true
            });
            this.props.setSignedUp({ isLoggedIn: true, userName: data.email });
          } else {
            this.setState({
              authFlag: false
            });
          }
        }
      })
      .catch(error => {
        console.log("Registration request failed", error);
        console.log("authflag" + this.state.authFlag);
      });
  };

  validate = e => {
    window.addEventListener(
      "load",
      function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "submit",
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

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log("errors -" + errors);
    if (errors) return;

    this.login();
  };

  render() {
    //let redirectVar = null;
    const ownerAccountFlag =
      this.state.selectedOption === "owner" ? true : false;
    let text;
    const authFlag = this.state.authFlag;
    if (authFlag === true) {
      return <Redirect to="/welcomePage" />;
      
    } else if (authFlag === false) {
      text = <p class="text-danger">Account already exists</p>;
    }

    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
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
        <br />

        <div className="form-row">
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
        <br />

        <div>
          {this.state.selectedOption === "owner" ||
          this.state.selectedOption === "buyer" ? (
            <div>
              <div>{text}</div>
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
                {ownerAccountFlag ? (
                  <div>
                    <div class="form-row">
                      <label for="restrauntName">Restraunt Name</label>
                      <div class="input-group">
                        <input
                          onChange={this.restrauntNameChangeHandler}
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
                      <TextField style={{width:"600px"}} variant="outlined">
                      </TextField>
                      </div>
                    </div>
                    <div>
                           Restaurant Phone Number:
                    </div>
                    <TextField style={{width:"200px"}} variant="outlined">
                    </TextField>
                    <div class="form-row">
                      <label for="restrauntZipCode">Restraunt Zip Code</label>

                      <div class="input-group">
                        <input
                          onChange={this.restrauntZipChangeHandler}
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
                            <Dropdown.Toggle variant="" id="dropdown-basic">
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
                ) : (
                  <div></div>
                )}
              </div>
              <br />

              <div class="form-row">
                <button class="btn btn-primary btn-sm" type="submit">
                  Create Your Account
                </button>
              </div>
              <div className="form-row form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Check"
                />
                <label
                  onChange={this.keepMeSignIn}
                  className="form-check-label"
                  htmlFor="Check"
                >
                  Keep me signed In
                </label>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <br />

        <div class="form-row">
          Have An Account Already? <a href="/login">SignIn</a>
        </div>
      </form>
    );
  }
}
const mapDispatchProps = {
  setSignedUp: setUserSignedUp
};

export default connect(
  null,
  mapDispatchProps
)(CreateAccount);

