import React, { Component } from 'react'
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { menu } from "../utils/menu";
import { FaChalkboardTeacher, FaUser } from 'react-icons/fa';

export default class Komponens3 extends Component {

  render() {
    const user = localStorage.getItem("user")
    const userID = localStorage.getItem("userID")
    const iskolaID = localStorage.getItem("iskolaID")
    const jog_admin = localStorage.getItem("jog_admin")
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
        <Container>
          <Navbar.Brand><FaChalkboardTeacher/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {menu.map((item, index) => {
                    return(
                      <Nav.Link>
                          <Link key={index} to={item.path} className='App-link'>
                            {item.item}
                          </Link>
                      </Nav.Link>
                    )
                })}
            </Nav>
            <Nav>
              <NavDropdown title={user}>
                <NavDropdown.Item>
                  <Link className='Dropdown-link' to={'/users/show/'+userID}><FaUser /> Adataim</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className='Dropdown-link'></Link>Jelszó megváltoztatása
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className='Dropdown-link'to='/logout'>Kilépés</Link>
                </NavDropdown.Item>
              </NavDropdown>
              
              {jog_admin ==='1'? (
                <NavDropdown title="Adminisztráció">
                  <NavDropdown.Item>
                    <Link className='Dropdown-link' to='/users'>Felhasználók</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {iskolaID ==='1' ? (
                    <NavDropdown.Item>
                      <Link className='Dropdown-link' to='/iskolak'>Iskolák</Link>
                    </NavDropdown.Item>
                  ):(
                    <NavDropdown.Item>
                      <Link className='Dropdown-link' to='/iskolak'>Iskola adatai</Link>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item>
                    <Link className='Dropdown-link' to='/munkakorok'>Munkakörök</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}

            </Nav>
          </Navbar.Collapse>
          </Container>
    </Navbar>
      </>
      
    )
  }
}