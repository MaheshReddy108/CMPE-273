import React, { Component } from "react";
import UserInfo from "./userInfo";
import NavBarHome from "./navBarHome";

class YourAccount extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {};
  }
  render() {
    return (
      <div>
        <NavBarHome />
        <UserInfo />
      </div>
    );
  }
}

export default YourAccount;
