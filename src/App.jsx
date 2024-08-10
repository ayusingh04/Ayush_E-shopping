import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Productlist';
import Box from './Box';
import ProductDetails from './Details';
import ProductHomePage from "./ProductHomePage";
import Navbar from './Navbar';
import Footer from './Footers';
import NotFound from './Notfound';
import { getProductsDetails } from './api';
import CartPag from './Cartpag';
import EnhancedLoginPage from './LoginPage';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

function App() {
  const savedDataString = localStorage.getItem('myCartItem') || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback((productId, count) => {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    updateCart(newCart);
  }, [cart]);

  const updateCart = (newCart) => {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('myCartItem', cartString);
  };

  const totalCount = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className="h-screen bg-gray-100 overflow-scroll flex flex-col">

        <Navbar productCount={totalCount} />
        <div className="grow">
          <Routes>
            <Route path="/" element={<ProductHomePage />} />
            <Route path="/productdetails/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cartpag" element={<CartPag cartitem={cart} updateCart={updateCart} />} />
            <Route path="/LoginPage" element={<EnhancedLoginPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Routes>
        </div>
        <Footer />

    </div>
  );
}

export default App;