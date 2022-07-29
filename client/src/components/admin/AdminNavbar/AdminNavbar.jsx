import React from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import './AdminNavbar.scss';
import { authAction } from '../../../redux/store/auth-slice';

const AdminNavbar = ({ sidebarOpen, handleSidebar }) => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authAction.logoutUser());
  };

  return (
    <Navbar className="admin__navbar px-3">
      <button onClick={handleSidebar} className="toggle__btn">
        {sidebarOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
      </button>
      {auth?.isLogged && (
        <Dropdown className="ms-auto">
          <Dropdown.Toggle className="dropdown__avatar ms-3" id="dropdown-user">
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
      )}
    </Navbar>
  );
};

export default AdminNavbar;
