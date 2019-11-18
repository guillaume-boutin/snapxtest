import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <Navbar
                bg="primary"
                variant="dark"
                expand="lg"
                style={style}
            >
                <Navbar.Brand as={Link} to="/">Snapx-Test</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}

                        <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const style = {
    marginBottom: "1em"
}

export default Header;