import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard/Dashboard';
import AdminLayout from './components/layout/AdminLayout/AdminLayout';
import PublicLayout from './components/layout/PublicLayout/PublicLayout';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PublicLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="admin" element={<PrivateRoute userRole="ADMIN" />}>
          <Route path="" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
