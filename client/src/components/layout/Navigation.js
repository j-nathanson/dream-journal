import React, { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import LogOutBtn from '../auth/LogOutBtn'


export default function Navigation() {

    // get global variable
    const { loggedIn } = useContext(AuthContext)
    return (
        <Navbar collapseOnSelect bg='dark' variant='dark' expand="sm">
        <Navbar.Toggle className='ml-auto' aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    {loggedIn === false && (
                        <>
                            <Nav.Item>
                                <Nav.Link href='/'>Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='/register'>Register</Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                    {loggedIn === true &&
                        <>
                            <Nav.Item>
                                <Nav.Link to='/journal'>Journal</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <LogOutBtn />
                            </Nav.Item>
                        </>

                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
