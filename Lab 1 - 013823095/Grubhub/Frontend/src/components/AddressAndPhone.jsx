import React from "react";


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
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";

// core components
import PanelHeader from "./PanelHeader";
import Sidebar from "./Sidebar";



class AddressAndPhone extends React.Component {
  render() {
    return (
      <>
        <Sidebar
          
          />
        <PanelHeader
          size="lg"
          
        />
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart" style={{"width":"1000px"}}>
                <CardHeader>
                  <CardTitle tag="h4">Addresses</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="">
                    You don't have any addresses
                  </div>
                  <br/>
                  <Button color="info">
                      + Add New Address
                  </Button>
                </CardBody>
                
              </Card>
            </Col>
            
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart" style={{"width":"1000px"}}>
                <CardHeader>
                  <CardTitle tag="h4">Phone</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="">
                    + 1-111-111-1111
                  </div>
                  <br/>
                  <Button color="info">
                      + Add a New Number
                  </Button>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AddressAndPhone;
