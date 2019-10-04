import React from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  
} from "reactstrap";

import PanelHeader from "./PanelHeader";
import Sidebar from "./Sidebar";


const btn_submit = {
  visibility : 'hidden'
}

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      userEmail: "",
      userAdr: "",
      userPhone: "",
      userZip: "",
      ProfileImage:"",

      RestaurantName: "",
      RestaurantAdr:"",
      RestaurantZip: "",
      RestaurantPhone: "",
      Cuisine:"",
      Locations:"",

      isNewUserCreated: false,
      validationError: false,
      errorRedirect: false,
      updateSuccessfull: false
  }
  this.firstNameHandler = this.firstNameHandler.bind(this);
  this.lastNameHandler = this.lastNameHandler.bind(this);
  this.restaurantNameHandler = this.restaurantNameHandler.bind(this);
  this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
  this.locationsChangeHandler = this.locationsChangeHandler.bind(this);
  this.emailHandler = this.emailHandler.bind(this);
  this.imageHandler = this.imageHandler.bind(this);
  this.addressHandler = this.addressHandler.bind(this);
  this.zipCodeHandler = this.zipCodeHandler.bind(this);
  this.phoneNumberHandler = this.phoneNumberHandler.bind(this);
  this.submitProfile = this.submitProfile.bind(this);
  this.restaurantPhoneNumberHandler = this.restaurantPhoneNumberHandler.bind(this);
  this.restaurantAddressHandler = this.restaurantAddressHandler.bind(this);
  this.restaurantZipCodeHandler = this.restaurantZipCodeHandler.bind(this);
  }

 // componentWillUnmount() {
 //   this._isMounted = false;
//}

componentDidMount() {

    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3001/Buyer-profile-details')
        .then(response => {
            if (response.status === 200) {
                console.log("response.data: ", response.data);
                var data = response.data;
                if(data.Res_name){    
                   this.setState({
                       Firstname: data.Fname,
                       Lastname: data.Lname,
                       Email: data.Email,
                       Phonenumber: data.Phone,
                       ProfileImage: data.Res_image,
                       ProfileImagePreview: undefined,
                       userAdr: data.Res_address,

                       RestaurantName: data.Res_name,
                       RestaurantAdr: data.Res_address,
                       RestaurantZip: data.Res_zip,
                       RestaurantPhone: data.Phone,
                       Cuisine: data.Cuisine,
                       Locations: data.Locations
                   });
                }
                else{
                    this.setState({
                       FirstName: data.Fname,
                       LastName: data.Lname,
                       userEmail: data.Email,
                       userPhone: data.Phone,
                       ProfileImage: data.Image,
                       userAdr: data.Address,
                    })
                }

                //DOwnload Image
                console.log("state: ",this.state);
                console.log('Profile Photo Name: ', data.ProfileImage);

                //Download image
                //axios.post('http://localhost:3001/download-file/' + data.ProfileImage)
                //    .then(response => {
                //        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                 //       this.setState({
                 //           ProfileImagePreview: imagePreview
                 //       })

                 //   });
                    


            }
        });
}


componentWillMount(){
    this.setState({
        authFlag : false
    })
}

  firstNameHandler = (e) => {
    this.setState({
        FirstName: e.target.value
    })
    console.log("FirstName: ",this.state.FirstName)
}

lastNameHandler = (e) => {
    this.setState({
        LastName: e.target.value
    })
    console.log("Lastname: ",this.state.Lastname)
}

cuisineChangeHandler = (e) => {
    this.setState({
        Cuisine: e.target.value
    })
    console.log("Cuisine: ",this.state.Cuisine)
}

locationsChangeHandler = (e) => {
    this.setState({
        Locations: e.target.value
    })
    console.log("Locations: ",this.state.Locations)
}

restaurantNameHandler = (e) => {
    this.setState({
        RestaurantName: e.target.value
    })
    console.log("RestaurantName: ",this.state.RestaurantName)
}


emailHandler = (e) => {
    this.setState({
        userEmail: e.target.value
    })
    console.log("userEmail: ",this.state.userEmail)
}

imageHandler = (e) => {
    this.setState({
        Password: e.target.value
    })
}

addressHandler = (e) => {
    this.setState({
        userAdr: e.target.value
    })
    console.log("userAdr: ",this.state.userAdr)
}

zipCodeHandler = (e) => {
    this.setState({
        userZip: e.target.value
    })
    console.log("userZip: ",this.state.userZip)
}

phoneNumberHandler = (e) => {
    this.setState({
        userPhone: e.target.value
    })
    console.log("userPhone: ",this.state.userPhone)
}

restaurantZipCodeHandler = (e) => {
    this.setState({
        RestaurantZip: e.target.value
    })
    console.log("RestaurantZip: ",this.state.RestaurantZip)
}

restaurantPhoneNumberHandler = (e) => {
    this.setState({
        RestaurantPhone: e.target.value
    })
}

restaurantAddressHandler = (e) => {
    this.setState({
        RestaurantAdr: e.target.value
    })
}

imageHandler = (e) => {
            const target = e.target;
            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);

                        //Download image
                        axios.post('http://localhost:3001/download-file/' + profilePhoto.name)
                            .then(response => {
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                    ProfileImage: profilePhoto.name,
                                    ProfileImagePreview: imagePreview
                                })

                            }).catch((err) =>{
                                if(err){
                                    this.setState({
                                        errorRedirect: true
                                    })
                                }
                            });
                    }
                });
        
}

  edit() {
    var el = document.getElementById('btn-edit');
    var frm = document.getElementById('change-information');
    if (el.value == 'Edit profile') {
        el.addEventListener('click', function () {
            for (var i = 0; i < frm.length; i++) {
                frm.elements[i].disabled = false;
            }
            frm.elements[0].focus();
            document.getElementById('btn-edit').style.visibility="hidden";
            document.getElementById('btn-submit').style.visibility="visible";
        });
    }
}

submitProfile = (e) =>{
    var type;
  e.preventDefault();
  axios.defaults.withCredentials = true;
  console.log("in submit profile");
  let data = null;
  if(this.state.RestaurantName){
      data = {
          userEmail: this.state.userEmail,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          UserPhone: this.state.userPhone,
          UserAdr: this.state.userAdr,
          UserZip: this.state.userZip,
          ProfileImage: this.state.ProfileImage,

          RestaurantName: this.state.RestaurantName,
          RestaurantAdr:this.state.RestaurantAdr,
          RestaurantZip: this.state.RestaurantZip,
          RestaurantPhone: this.state.RestaurantPhone,
          Cuisine: this.state.Cuisine,
          Locations: this.state.Locations
      }
      type = "owner";

  }
  else{
      data = {
          UserEmail: this.state.userEmail,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          UserPhone: this.state.userPhone,
          UserAdr: this.state.userAdr,
          ProfileImage: this.state.ProfileImage,
          UserZip: this.state.userZip
      }
      type = "buyer"
  }
    console.log('Data: ', data);

    if(type == "buyer"){
        axios.post('http://localhost:3001/Buyer-update-profile', data)
        .then(response => {
            if (response.status === 200) {
                console.log('');
                this.setState({
                    updateSuccessfull: true
                    
                })
                var el = document.getElementById('btn-submit');
                var frm = document.getElementById('change-information');
                if (el.value == 'save changes') {
                  el.addEventListener('click', function () {
                  for (var i = 0; i < frm.length; i++) {
                      frm.elements[i].disabled = true;
                  }
                  document.getElementById('btn-edit').style.visibility="visible";
                  document.getElementById('btn-submit').style.visibility="hidden";
                });
    }
            }
        }).catch((err) =>{
            if(err){
                this.setState({
                    errorRedirect: true
                })
            }
        });
    }
    else{
        axios.post('http://localhost:3001/Owner-update-profile', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('');
                    this.setState({
                        updateSuccessfull: true
                    })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
}



  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
       redirectVar = <Redirect to="/login" />
    }

    if(this.state.updateSuccessfull === true){
        console.log("redirecting after saving changes");
        redirectVar = <Redirect to="/dashboard" />
    }

    if (this.state.errorRedirect === true) {
        redirectVar = <Redirect to="/error" />
    }
    var restaurants = null;
        if(this.state.RestaurantName){
            restaurants = 
            <div>
                <h3> Your restaurant details: </h3> 
                <div className="form-group">
                    <label>Restaurant name:</label>
                    <input onChange={this.restaurantNameHandler} name="restaurantName" type="text" className="form-control" id="inputAddress" value= {this.state.RestaurantName} required disabled/>
                </div>
                <div className="form-group">
                    <label>Restaurant Address</label>
                    <input onChange={this.restaurantAddressHandler} name="restaurantAddress" type="text" className="form-control" id="inputAddress2" value= {this.state.RestaurantAdr} required disabled/>
                </div>
                <div className="form-group">
                    <label>Cuisine</label>
                    <input onChange={this.cuisineChangeHandler} name="cuisine" type="text" className="form-control" id="inputAddress2" value= {this.state.Cuisine} required disabled/>
                </div>
                <div className="form-group">
                    <label>Locations</label>
                    <input onChange={this.locationsChangeHandler} name="locations" type="text" className="form-control" id="inputAddress2" value= {this.state.Locations} required disabled/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Phone Number:</label>
                        <input onChange={this.restaurantPhoneNumberHandler} value= {this.state.RestaurantPhone} name="restaurantPhone" type="text" className="form-control" id="inputPhone" pattern="[0-9]{10}" required disabled/>
                    </div>
                    <div className="form-group col-md-2">
                        <label >Zip</label>
                        <input onChange={this.restaurantZipCodeHandler} value= {this.state.RestaurantZip} name="restaurantZip" type="number" className="form-control" id="inputZip" required disabled/>
                    </div>
                </div>
            </div>
        }

    return (
      <>
        <div className="container">
            {redirectVar}
        </div>
        <Sidebar
          
          />
        <PanelHeader
          size="lg"
          
        />
        <div className="">
                          <form id="change-information">
                                 <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input onChange={this.emailHandler} name="userEmail" type="email" className="form-control" id="inputEmail4" value={this.state.userEmail} disabled />
                                    </div>
                                    <div >
                                        <label>Profile image</label><br />
                                        <input onChange={this.imageHandler} name="userImage" type="file" id="userImage" placeholder="Upload your image here" disabled accept="image/png, image/jpeg" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Your First name:</label>
                                    <input onChange={this.firstNameHandler} name="userFirstName" type="text" className="form-control" id="inputAddress"value={this.state.FirstName} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Your Last name:</label>
                                    <input onChange={this.lastNameHandler} name="userLastName" type="text" className="form-control" id="inputAddress"value={this.state.LastName} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input onChange={this.addressHandler} name="userAddress" type="text" className="form-control" id="inputAddress2" value={this.state.userAdr} disabled />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Phone Number</label>
                                        <input onChange={this.phoneNumberHandler} name="userPhone" type="text" pattern="[0-9]{10}" className="form-control" id="inputNumber" value={this.state.userPhone} disabled />
                                    </div>

                                    <div className="form-group col-md-2">
                                        <label>Zip</label>
                                        <input onChange={this.zipCodeHandler} name="userZip" type="number" className="form-control" id="inputZip" value={this.state.userZip} disabled />
                                    </div>
                                </div>
                                <div>
                                    {restaurants}
                                </div>
                                <div className="formholder">
                                    <span>
                                        <input className="btn btn-primary" type="button" id="btn-edit" onClick={this.edit} value="Edit profile" />
                                        <input className="btn btn-success" type="button" id="btn-submit" onClick={this.submitProfile} value="save changes" style = {btn_submit}/>
                                    
                                    </span>
                                </div>
                           </form>

        </div>
      </>
    );
  }
}

export default Dashboard;
