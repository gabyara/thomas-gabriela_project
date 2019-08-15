import React from 'react';
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
import {NavLink} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import FaceLogin from './components/FaceLogin';



export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });}

  render() {
    return (
      <div>

        <Navbar color="light" light expand="lg" >
        <NavbarBrand href="/">Thomas and Gabriela Project</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>

              <NavItem className="link">
                <NavLink className="link" to="/principal">Home</NavLink>
              </NavItem>

              <NavItem className="link">
                <NavLink className="link" to="/services">Services</NavLink>
              </NavItem>

              <NavItem className="link">
                <NavLink className="link" to="/plans">Plans</NavLink>
              </NavItem>

              <NavItem className="link">
                <NavLink className="link" to="/homeUser">Home User</NavLink>
              </NavItem>

              <NavItem>
              <FaceLogin/>
              </NavItem>

            </Nav>
            </Collapse>
        </Navbar>

      </div>
    );
  }
}