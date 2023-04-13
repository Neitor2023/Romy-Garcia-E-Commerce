import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'

const NavBar = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }

  const sideBarAction = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setShow(true);
    } else {
      //redireccion al login
      navigate("/login");
    }
  };


  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">So cheap App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/purchase">Purchase</Nav.Link>
            <Nav.Link
              onClick={() => sideBarAction()}
            >Purchase (sidebar)</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Sidebar
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}

export default NavBar;