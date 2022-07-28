import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
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
        <Route path="" element={<PrivateRoute userRole="ADMIN" />}>
          <Route path="admin/dashboard" element={'Welcome to Dashboard'} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
