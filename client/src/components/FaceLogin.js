import React, { Component } from 'react';
import styled from 'styled-components';
import '../css/App.css';
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const Contenedor = styled.div`
  
`;


class FacebookLogin extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedStatus: false,
      ID:0,
      redirect2: false
    }
  }

  componentDidMount(){
    this.setState({
      redirect2: false
    })
    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : '402202960407667',
        xfbml      : true,
        version    : 'v2.11'
      });

      window.FB.Event.subscribe("auth.statusChange", response => {
        this.statusChangeCallback(response);
      });

      this.checkLoginStatus();
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  statusChangeCallback(response){
    console.log(response);
    if(response.status == "connected"){
      this.setState({
        redirect2: false
      })
      
      this.setState({
        loggedStatus: true,
        userID: response.authResponse.userID
      });
      this.getPersonalData();
      setTimeout(function(){ 
        console.log("ID",this.state.ID) 
        sessionStorage.setItem('id',this.state.ID);
        this.setRedirectHome();
    }.bind(this), 500);
    
    } else {
      console.log("salio")
      this.setState({
        loggedStatus: false
      });
      sessionStorage.setItem('id',"no-undefined")
      this.setRedirectPrincipal2()
    }
  }

  checkLoginStatus(){
    window.FB.getLoginStatus(response => this.statusChangeCallback(response));
  }

  getPersonalData(){
    var url = "/" + this.state.userID + "?fields=name,picture";
    window.FB.api(url, response => {
      console.log(response);
      console.log(response.id);
      this.setState({
        name: response.name,
        picture: response.picture.data.url,
        ID:response.id
      });
      });
  }

  showPersonalData(){
    if(this.state.loggedStatus){
      return (
        <div>
          <Row>
           <Col sm={5}>
          <p>Bienvenido, {this.state.name}</p>
          </Col>
          <Col sm={3}>
          <img src={this.state.picture} alt="foto no encontrada"/>
          </Col>
          </Row>
        </div>
      );
    }
  }
  setRedirectHome = () => {

    this.setState({
      redirect: true
    })

  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/homeUser' />
    }
  }

  setRedirectPrincipal2 = () => {
    this.setState({
      redirect2: true
    })
    this.setState({
      redirect2: false
    })
  }
  renderRedirect2 = () => {
    if (this.state.redirect2) {
      return <Redirect to='/principal' />
    }
  }

  render() {
    return (
      <Contenedor>
       
        {this.showPersonalData()}
        <Row>
        <Col sm={5}>
        <div className="fb-login-button face" 
             data-max-rows="1" 
             data-size="large" 
             data-button-type="continue_with" 
             data-show-faces="false" 
             data-auto-logout-link="true" 
             data-use-continue-as="false">
          </div>
          </Col>
        </Row>
          {this.renderRedirect()}
          {this.renderRedirect2()}
      </Contenedor>
    );
  }
}

export default FacebookLogin;



