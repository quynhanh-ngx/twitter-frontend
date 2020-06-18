import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Bell, Envelope, Hash, HouseDoor, Moon, Person} from "react-bootstrap-icons";

let isLoggedIn = false;

const MyNavbar = () => (
<Navbar className="w-100" sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home"><Moon/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav fill justify className="mr-auto">
        <Nav.Link active href="#home"><HouseDoor/> Home</Nav.Link>

        {isLoggedIn ? [<Nav.Link href="#profile"><Person/> Profile</Nav.Link>,
                <Nav.Link href="#notifications"><Bell/> Notifications</Nav.Link>,
                <Nav.Link href="#messages"><Envelope/> Messages</Nav.Link>]:
            [<Nav.Link href="#login"><Person/> Log in</Nav.Link>,
            <Nav.Link href="#signup"><Person/> Sign up</Nav.Link>]
        }
    </Nav>
    <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
    </Form></Navbar.Collapse>
</Navbar>

)

export default MyNavbar