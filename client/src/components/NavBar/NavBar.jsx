import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../../redux/store/auth-slice';
import './Navbar.scss';
import Logo from '../../images/smart-shopping.png';
import { productListAction } from '../../redux/store/product-list-slice';

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
  const auth = useSelector((store) => store.auth);
  const { productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authAction.logoutUser());
    dispatch(productListAction.clearAllFromCart());
  };

  return (
    <Navbar expand="lg" className="sticky-top shadow-sm">
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
          <Link
            to="/cart"
            className="btn border-0 badge__style position-relative"
          >
            <FiShoppingCart />
            <span className="rounded-circle">
              {productList?.cartList?.length}
            </span>
          </Link>
          {auth?.user?.token ? (
            <Dropdown>
              <Dropdown.Toggle
                className="dropdown__avatar ms-3 p-0"
                id="dropdown-user"
              >
                <img
                  src={auth?.user?.user?.avatar}
                  alt={auth?.user?.user?.username}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown__menu">
                <Link
                  to="/user/profile"
                  className="dropdown-item d-flex align-items-center"
                >
                  Profile
                </Link>
                {auth?.user?.user?.roles.some((item) => item === 'ADMIN') && (
                  <Link
                    to="/admin/dashboard"
                    className="dropdown-item d-flex align-items-center"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn dropdown-item d-flex align-items-center"
                >
                  <span className="me-2">Logout</span> <FiLogOut />
                </button>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary mx-3">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
