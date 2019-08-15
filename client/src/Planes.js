import React from 'react';
import FaceLogin from './components/FaceLogin';
import Services from './Services';
import Principal from './Principal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter,MDBBtn, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';

class FullPageIntroWithFixedTransparentNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

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
      <div>
        <header>
          {/* <Router>
          <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand href="#">
                <strong>Navbar</strong>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem >
                    <MDBNavLink to="/Principal">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/Services">Our service</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink to="#">Plans</MDBNavLink>
                  </MDBNavItem>
                  
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem >
                      

                  <MDBNavLink onClick={this.toggle} className="waves-effect waves-light" to="#!">
                 LogIn con facebook
              
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader className="Titulo" toggle={this.toggle}>LogIn</MDBModalHeader>
                  <MDBModalBody>
                  
                  <div className="modal-body mx-3">
                    <div className="md-form mb-5">
                      <i className="fas fa-envelope prefix grey-text"></i>
                      <input type="email" id="defaultForm-email" className="form-control validate"></input>
                      <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
                    </div>

                    <div className="md-form mb-4">
                      <i className="fas fa-lock prefix grey-text"></i>
                      <input type="password" id="defaultForm-pass" className="form-control validate"></input>
                      <label data-error="wrong" data-success="right" for="defaultForm-pass">Your password</label>
                    </div>

                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                   <button className="btn btn-default " className= "boton">Login</button>
                   <FaceLogin/>
                  </div>
                
                  </MDBModalBody>
                </MDBModal>
              </MDBNavLink>

                  </MDBNavItem>
                  </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            
          </Router> */}

          <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(42).jpg">
            <MDBMask overlay="purple-light" className=" flex-column text-white text-center">
              <h2 style={{marginTop: '10%'}}>The best plans at your fingertips:</h2>
             
             

              <div className="card" style={{float:'left', width:'20%',marginTop: '5%',marginLeft:'15%'}}>
                <div className="view overlay">
                  <img className="card-img-top" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg" alt="Card image cap"></img>
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div className="card-body">


                  <h4 className="card-title"  style={{color: '#aa98cc'}} >STANDARD PLAN</h4>
                  <h5 className="card-text">FREE!!!</h5>
                  <p className="card-text">You will have a storage space of up to 1G.</p>
                  
                </div>
              </div>
              <div className="card" style={{float:'left', width:'20%',marginTop: '5%',marginLeft:'5%'}}>
                <div className="view overlay">
                  <img className="card-img-top" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg" alt="Card image cap"></img>
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div className="card-body">


                <h4 className="card-title"  style={{color: '#aa98cc'}} >INTERMEDIATE PLAN</h4>
                  <h5 className="card-text">Contact us</h5>
                  <p className="card-text">You will have a storage space of up to 10G.</p>
                  
                </div>
              </div>
              <div className="card" style={{float:'left', width:'20%',marginTop: '5%',marginLeft:'5%'}}>
                <div className="view overlay">
                  <img className="card-img-top" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg" alt="Card image cap"></img>
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div className="card-body">


                <h4 className="card-title"  style={{color: '#aa98cc'}} >PREMIUM PLAN</h4>
                  <h5 className="card-text">Contact us</h5>
                  <p className="card-text">Unlimited storage space available.</p>
                  
                </div>
              </div>


            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default FullPageIntroWithFixedTransparentNavbar;