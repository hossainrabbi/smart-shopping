import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from './components/admin/Categories/Categories';
import Dashboard from './components/admin/Dashboard/Dashboard';
import Products from './components/admin/Products/Products';
import AddProduct from './components/admin/AddProduct/AddProduct';
import Users from './components/admin/Users/Users';
import Orders from './components/admin/Orders/Orders';
import AdminLayout from './components/layout/AdminLayout/AdminLayout';
import PublicLayout from './components/layout/PublicLayout/PublicLayout';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import EditProduct from './components/admin/EditProduct/EditProduct';
import Home from './components/pages/Home/Home';
import Cart from './components/user/Cart/Cart';
import Checkout from './components/user/Checkout/Checkout';
import Shop from './components/pages/Shop/Shop';
import Profile from './components/user/Profile/Profile';
import SingleProductDetails from './components/pages/SingleProductDetails/SingleProductDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="" element={<PublicLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:productId" element={<SingleProductDetails />} />
        </Route>
        <Route path="" element={<PrivateRoute userRole="USER" />}>
          <Route path="" element={<PublicLayout />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="admin" element={<PrivateRoute userRole="ADMIN" />}>
          <Route path="" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<EditProduct />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
