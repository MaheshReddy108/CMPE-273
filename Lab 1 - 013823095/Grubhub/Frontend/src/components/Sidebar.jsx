
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div align="center" className="logo" style={{"font-weight":"bold", "font-size":"20px"}} >
          <Button style={{"font-weight":"bold", "font-size":"20px"}}><Link to="/UserSearchPage" style={{"color":"darkblue", opacity:"0.7"}}>
            GRUBHUB
            </Link>
          </Button>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav >
            <div align="center">
              <Button ><Link to="/dashboard" style={{"color":"darkblue", opacity:"0.7"}}>
                Profile
               </Link>
              </Button>
           </div>
           <div align="center">
              <Button color="primary" >
                Past Orders
              </Button>
           </div>
           <div align="center">
              <Button color="primary" >
                Upcoming orders
              </Button>
           </div>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
