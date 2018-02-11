import React from 'react';
import {Navbar} from 'react-bootstrap'

const NavBar = (props) => (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <span>{props.title}</span>
            </Navbar.Brand>
        </Navbar.Header>
    </Navbar>
)

export default NavBar