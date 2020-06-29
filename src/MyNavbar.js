import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {Bell, Envelope, HouseDoor, Person} from "react-bootstrap-icons";

function MyNavbar(props) {
    return <Navbar className="w-100 navbar-background" sticky="top" collapseOnSelect expand="lg"  >
        <Navbar.Brand href="#home"><div className="🚀"><span role="img" aria-label="logo">🚀</span></div></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav fill justify className="mr-auto">
                <Nav.Link active href="#home"><HouseDoor/> Home</Nav.Link>

                {props.logged_in ? [
                        <Nav.Link key = {0} href="#profile"><Person/> Profile</Nav.Link>,
                        <Nav.Link key = {1} href="#notifications"><Bell/> Notifications</Nav.Link>,
                        <Nav.Link key = {2} href="#messages"><Envelope/> Messages</Nav.Link>,
                        <Nav.Link key = {3} href="#logout" onClick={props.handle_logout}><Person/> Log out</Nav.Link>]:
                    [
                        <Nav.Link key = {0} href="#login" onClick={() => props.display_form('login')}><Person/> Log in</Nav.Link>,
                        <Nav.Link key = {1} href="#signup" onClick={() => props.display_form('signup')}><Person/> Sign up</Nav.Link>]
                }
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form></Navbar.Collapse>
    </Navbar>
}


MyNavbar.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};

export default MyNavbar