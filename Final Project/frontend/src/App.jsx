import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductsDetails from './components/Products/ProductsDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagment from './components/Admin/UserManagment';
import ProductManagment from './components/Admin/ProductManagment';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagment from './components/Admin/OrderManagment';
import { Toaster } from "sonner";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from './components/Comman/ProtectedRoute';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>

          <Route path='/' element={<UserLayout />} >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="collections/:collection" element={<CollectionPage />} />
            <Route path="products/:id" element={<ProductsDetails />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
          </Route>


          <Route path='/admin' element={ <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHomePage />} />
            <Route path='users' element={<UserManagment />} />
            <Route path='products' element={<ProductManagment />} />
            <Route path='products/:id/edit' element={<EditProductPage />} />
            <Route path='orders' element={<OrderManagment />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )


}

export default App