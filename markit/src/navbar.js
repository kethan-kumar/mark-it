import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import DoneIcon from '@material-ui/icons/Done';
import React from "react";
import { useState } from "react";
import './App.css';


const NavigationBar = () => {
    const [toggle, setToggle] = useState(true);
    const handleToggle = () => {
        if (toggle) setToggle(false);
        else setToggle(true);
    }
    if (toggle) {

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home" style={{ 'color': '#ffffff' }}>
                        MarkIT
                        <DoneIcon fontSize="large"></DoneIcon>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">HOME</Nav.Link>
                            <Nav.Link href="/#/courses">COURSES</Nav.Link>
                            <Nav.Link href="/#/myApplication">MY APPLICATION</Nav.Link>
                            <Nav.Link href="#hiring">HIRING</Nav.Link>
                            <Nav.Link href="#onBoarding">ONBOARDING</Nav.Link>
                            <Nav.Link href="/#/profile">PROFILE</Nav.Link>
                            <Nav.Link href="/#/reset">RESET</Nav.Link>
                            <Nav.Link href="/#/login" onClick={handleToggle}>LOGOUT</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>


        );
    }
    else {
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home" style={{ 'color': '#ffc800' }}>
                        MarkIT
                        <DoneIcon fontSize="large"></DoneIcon>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">HOME</Nav.Link>
                            <Nav.Link href="/#/login" onClick={handleToggle}>SIGN IN</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>


        );
    }

}
export default NavigationBar