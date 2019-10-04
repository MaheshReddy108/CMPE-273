import React, { Component } from "react";
import Home from "./components/home";
import Login from "./components/login";
import WelcomePage from "./components/welcomePage";
import CreateAccount from "./components/createAccount";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import YourAccount from "./components/yourAccount";
import Dashboard from "./components/Dashboard";
import AddressAndPhone from "./components/AddressAndPhone"
import Payments from "./components/Payments";
import GiftCards from "./components/GiftCards";
import UserSearchPage from "./components/UserSearchPage";
import SearchResult from "./components/SearchResult";
import AddanItemToMenu from "./components/AddanItemToMenu";
import OwnerOrderManagement from "./components/OwnerOrderManagement";
import BuyerSignUp from "./components/SignUp/BuyerSignUp";
import OwnerSignUp from "./components/SignUp/OwnerSignup";

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      isSearch : false,
      cuisine :"",
      searchText: ""
      
  
  }
  this.handlesearchClick = this.handlesearchClick.bind(this);
  this.handleCuisineChange= this.handleCuisineChange.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  
  }
handlesearchClick = () => {
        
    this.setState({
        isSearch : true            
    })
}

handleCuisineChange=(filter)=>{
  this.setState({
    cuisine : filter           
})
}

handleInputChange = (event) =>{
  var target = event.target;
  var name = target.name;
  var value = target.value;

  this.setState({
      [name] : value
  });
}



  render() {
    return (
    
        <main className="container">
          <div className="content">
            <BrowserRouter>
              <Switch>

              <Route exact render = {()=>{
                    return(
                        <UserSearchPage 
                            handleInputChange={this.handleInputChange} searchText={this.state.searchText}
              
                            handleCuisineChange={this.handleCuisineChange} startDate={this.state.cuisine}
                            isSearch={this.state.isSearch} searchClick={this.handlesearchClick}/>
                    );
                }}
                
                
                 path="/" />
                <Route render = {()=>{
                    return(
                        <UserSearchPage 
                        handleInputChange={this.handleInputChange} searchText={this.state.searchText}
              
                        handleCuisineChange={this.handleCuisineChange} startDate={this.state.cuisine}
                        isSearch={this.state.isSearch} searchClick={this.handlesearchClick}/>
                    );
                }} path="/UserSearchPage"  />


                  <Route render = { () => {
                    return (
                    <DisplayProperties 
                    handleInputChange={this.handleInputChange} searchText={this.state.searchText}
              
                    handleCuisineChange={this.handleCuisineChange} startDate={this.state.cuisine}
                    isSearch={this.state.isSearch} searchClick={this.handlesearchClick}/>
                        );
                }}
                path="/display-properties" />

                <Route path="/property-display/:id" component={PropertyDisplay} />
                

                {/* <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} /> */}
                
                <Route path="/AddanItemToMenu" component={AddanItemToMenu} />
                
                <Route path="/OwnerOrderManagement" component={OwnerOrderManagement} />
                <Route path="/BuyerSignUp" component={BuyerSignUp} />
                <Route path="/OwnerSignUp" component={OwnerSignUp} />


                <Route path="/dashboard" component={Dashboard} />
                <Route path="/AddressAndPhone" component={AddressAndPhone} />
                <Route path="/Payments" component={Payments} />
                <Route path="/GiftCards" component={GiftCards} />
                <Route path="/UserSearchPage" component={UserSearchPage} />
                <Route path="/SearchResult" component={SearchResult} />

                <Route path="/welcomePage" component={WelcomePage} />
                <Route path="/createAccount" component={CreateAccount} />
                <Route path="/yourAccount" component={YourAccount} />
              </Switch>
            </BrowserRouter>
          </div>
        </main>
      
    );
  }
}
export default App;
