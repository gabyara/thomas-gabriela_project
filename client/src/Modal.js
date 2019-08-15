
import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Support</MDBModalHeader>
        <MDBModalBody>
  
    <div className="modal-content">
     
      <div className="modal-body mx-3">
        <div className="md-form mb-5">
          <i className="fas fa-user prefix grey-text"></i>
          <input type="text" id="form34" className="form-control validate"></input>
          <label data-error="wrong" data-success="right" for="form34">Your name</label>
        </div>

        <div className="md-form mb-5">
          <i className="fas fa-envelope prefix grey-text"></i>
          <input type="email" id="form29" className="form-control validate"></input>
          <label data-error="wrong" data-success="right" for="form29">Your email</label>
        </div>

        <div className="md-form mb-5">
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
          <MDBBtn color="secondary" onClick={this.toggle}>Cancel </MDBBtn>
          <MDBBtn color="primary">Send</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;