import React, { Component } from "react";
import YourAccount from "./yourAccount";
import NavBarHome from "./navBarHome";
import UserInfo from "./userInfo";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const Layout = ({ children }) => (
  <div>
    <NavBarHome />
    {children}
  </div>
);

class WelcomePage extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
  }

  render() {
    return (
      <main className="container">
        <div className="content">
          <Layout>
            <p> Welcome {`${this.props.userName}`}</p>
            <Route exact path="/yourAccount" component={YourAccount} />
            <Route path="/userInfo" component={UserInfo} />
          </Layout>
        </div>
      </main>
    );
  }
}

const mapState = state => {
  return {
    isUserLoggedIn: state.authState.isLoggedIn,
    userName: state.authState.userName
  };
};

export default connect(mapState)(WelcomePage);
