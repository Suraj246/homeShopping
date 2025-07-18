// import Products from "./components/home/Products";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./components/productScreen/ProductScreen";
import Home from "./components/home/Home";
import NavbarCart from "./components/header/NavbarCart";
import Header from "./components/header/Header";
// import Categary from "./components/categary/Categary";
// import Mens from "./components/categary/Mens";
// import AllProducts from "./components/categary/AllProducts";
import LogIn from './components/header/LogIn'
import SingUp from './components/header/SingUp'

import React, { useState } from "react";
import ShippingAddress from "./components/shipping/ShippingAddress";
import Payment from "./components/shipping/Payment";
import OrderSummary from "./components/shipping/OrderSummary";
import UserOrders from "./components/header/UserOrders";
import CreateProduct from "./components/admin/CreateProduct";
import AllUsers from "./components/admin/AllUsers";
import CustomerScreen from "./components/admin/CustomerScreen";
import CustomerOrders from "./components/admin/CustomerOrders";
import MoreProducts from "./components/home/MoreProducts";
import Footer from "./components/footer/Footer";
import Page404 from "./components/Page404";
import UpdateProduct from "./components/admin/UpdateProduct";

function App() {
  const [input, setInput] = useState('')


  return (
    <>
      <Header input={input} setInput={setInput} />
      {/* <Products /> */}
      <Routes>
        <Route path="/" element={<Home input={input} />} />
        <Route path="/cart" element={<NavbarCart />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/customer/:id" element={<CustomerScreen />} />
        <Route path="/customer-orders" element={<CustomerOrders />} />
        <Route path="/more_products" element={<MoreProducts input={input} />} />


        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/*" element={<Page404 />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
