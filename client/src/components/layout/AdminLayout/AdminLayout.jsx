import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaUser, FaListUl } from 'react-icons/fa';
import { Container } from 'react-bootstrap';
import {
  BsFillBagFill,
  BsFillCartPlusFill,
  BsBasket3Fill,
} from 'react-icons/bs';
import './AdminLayout.scss';
import Logo from '../../../images/smart-shopping.png';
import LogoSmall from '../../../images/smart-shopping-small.png';
import AdminNavbar from '../../admin/AdminNavbar/AdminNavbar';

const sidebarMenu = [
  {
    icon: MdDashboard,
    name: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    icon: BsFillBagFill,
    name: 'Products',
    link: '/admin/products',
  },
  {
    icon: BsFillCartPlusFill,
    name: 'Add Product',
    link: '/admin/add-product',
  },
  { icon: FaListUl, name: 'Categories', link: '/admin/categories' },
  {
    icon: FaUser,
    name: 'Users',
    link: '/admin/users',
  },
  {
    icon: BsBasket3Fill,
    name: 'Orders',
    link: '/admin/orders',
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const activeStyle = {
    color: '#ffffff',
    backgroundColor: '#002d68',
  };

  return (
    <main className="admin__layout">
      <aside
        className={`sidebar ${
          sidebarOpen ? 'open__sidebar' : 'close__sidebar'
        }`}
      >
        <div className="logo">
          <Link to="/">
            <img src={sidebarOpen ? Logo : LogoSmall} alt="smart-shopping" />
          </Link>
        </div>
        <div className="sidebar-menu">
          {sidebarMenu.map(({ link, name, icon: Icon }) => (
            <NavLink
              key={name}
              to={link}
              className="nav-link sidebar-menu-item d-flex"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <span className="icon">
                <Icon />
              </span>
              <span className="name">{name}</span>
            </NavLink>
          ))}
        </div>
      </aside>
      <section className="admin__area">
        <AdminNavbar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
        <Container fluid className="p-3">
          <Outlet />
        </Container>
      </section>
    </main>
  );
};

export default AdminLayout;
