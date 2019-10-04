import React, { Component } from "react";

class UserInfo extends React.Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: ""
    };
  }

  getUserInfo = e => {};

  componentDidMount() {
    this.setState({
      name: "Manish"
    });

    //this.getUserInfo(); use this for getter method for profile info
  }

  render() {
    const userName = this.state.name;
    return (
      <form>
        <div className="form-group">
          <h5>Your Account</h5>
          <ul class="list-group border">
            <li class="list-group-item border border-white">
              Name :<span class="text-secondary">{userName}</span>
            </li>
            <li class="list-group-item border border-white">
              Email :<span class="text-secondary"></span>
            </li>
            <li class="list-group-item border border-white">
              Password :<span class="text-secondary"></span>
            </li>
          </ul>
        </div>
      </form>
    );
  }
}

export default UserInfo;
