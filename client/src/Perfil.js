import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/App.css';
import Navbar from './Navbar';
import File from "./components/File"
import Folder from "./components/Folder"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBProgress } from 'mdbreact';

let aes256 = require('aes256');

class App extends Component {
  
render() {
  
    return (
        <div className="App"> 
        <Navbar/>
        <Row>
            <Col sm={2}>
            </Col>
            <Col sm={8}>     
                <Row> 
 
                    <Col xs="12">
                        <Row>
          
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
      <Container>

      </Container>
      </div>
    );
  }
}

export default App;