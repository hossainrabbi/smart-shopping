import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import './Navbar.scss';
import Logo from '../../images/smart-shopping.png';

const navMenu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Shop',
    link: '/shop',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
];

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand app__logo">
          <img src={Logo} alt="smart-shopping" />
        </Link>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="ms-auto">
            {navMenu.map((navItem) => (
              <Link to={navItem.link} key={navItem.name} className="nav-link">
                {navItem.name}
              </Link>
            ))}
          </Nav>
          <button className="btn border-0 badge__style position-relative">
            <FiShoppingCart />
            <span className="rounded-circle">10</span>
          </button>
          <Link to="/login" className="btn btn-primary mx-3">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
