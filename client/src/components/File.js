import React, { Component } from 'react';
import filePic from "../Img/file.svg";

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
  import { Row,Button, Modal, ModalHeader, ModalBody, ModalFooter , FormGroup, Label, Input  } from 'reactstrap';
class File extends Component {
  
  state={
    modalEdit:false,isOpen: false,modal: false
  }

  clickCard= () => {
    this.props.changeHere(this.props.children);
  }
  clickDelete = () => {
    this.props.deleteElement(this.props.valueFile,false)
  }
  clickCopy = () => {
    var aux = this.props.children;
    console.log("PRUEBAAA CHILDREEN",this.props.children)
    this.props.copyElement(aux)
  }
  clickEdit= () => {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit
    }));
  }

  clickDownload = () => {
  
    this.props.callFile(this.props.valueFile,this.props.labelFile)
  }

  editName = () => {
    var newName=document.getElementById("editName").value;
    this.props.editName(this.props.valueFile, newName)
    this.clickEdit();
   }
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
        <div className="element" >
          <Row>
          
              <MDBDropdown className="menuPic" >
                <MDBDropdownToggle nav caret>
                <MDBIcon icon="bars" /> 
                  
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default SubMenu">
                <MDBDropdownItem  onClick={this.clickDelete}>Delete</MDBDropdownItem>
              <MDBDropdownItem  onClick={this.clickEdit} >Rename</MDBDropdownItem>
              <MDBDropdownItem onClick={this.clickCopy}>Copy</MDBDropdownItem>
              <MDBDropdownItem onClick={this.clickDownload} >Download</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <Modal isOpen={this.state.modalEdit} toggle={this.clickEdit}>
          <ModalHeader toggle={this.clickEdit}>Edit Name</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="newFolder">New Name for {this.props.labelFile}:</Label>
            <Input type="text" name="editName" id="editName" placeholder="New name"/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editName}>Edit</Button>{' '}
            <Button color="secondary" onClick={this.clickEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
          </Row>
          <div className="clickeable">
            <Row>
              <img className="fileIcon" src={filePic} width="80px" alt="File"></img>
            </Row>
            <Row >
              <p className="textElement" width="60px">{this.props.labelFile}</p>
            </Row>
          </div>
        </div>
      );
    }
  }
  
  export default File;
  
