import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';

const PublicLayout = () => {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
};

export default PublicLayout;
