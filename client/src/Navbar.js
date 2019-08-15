import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './css/App.css';
import './Modal.js';

class NavbarPage extends Component {
  state = {
    isOpen: false,modal: false
    
  };  

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar className="Color" dark expand="md">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          
          <MDBNavbarNav right >
          <MDBNavItem>
              <MDBNavLink onClick={this.toggle} className="waves-effect waves-light" to="#!">
                <MDBIcon  icon="fas fa-envelope" /> Support
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader className="Titulo" toggle={this.toggle}>Support</MDBModalHeader>
                  <MDBModalBody>
                  
                    <div className="modal-content">
                    
                      <div className="modal-body mx-2">
                        <div className="md-form mb-3">
                          <i className="fas fa-user prefix grey-text"></i>
                          <input type="text" id="form34" className="form-control validate"></input>
                          <label data-error="wrong" data-success="right" for="form34">Your name</label>
                        </div>

                        <div className="md-form mb-3">
                          <i className="fas fa-envelope prefix grey-text"></i>
                          <input type="email" id="form29" className="form-control validate"></input>
                          <label data-error="wrong" data-success="right" for="form29">Your email</label>
                        </div>

                        <div className="md-form mb-3">
                          <i className="fas fa-tag prefix grey-text"></i>
                          <input type="text" id="form32" className="form-control validate"></input>
                          <label data-error="wrong" data-success="right" for="form32">Subject</label>
                        </div>

                        <div className="md-form">
                          <i className="fas fa-pen-square"></i>
                          <textarea type="text" id="form8" className="md-textarea form-control" rows="4"></textarea>
                        
                        </div>

                      </div>
                    </div>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                    <MDBBtn color="primary">send</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem >
              <MDBDropdown >
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" /> Profile
                  
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default SubMenu">
                  <MDBDropdownItem  href="#!">Edit profile</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Close session</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;

