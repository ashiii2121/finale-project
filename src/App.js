import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "animate.css";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Trend from "./components/Trend";
import Discount from "./components/Discount";
import Services from "./components/Services";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Import the new page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import MensPage from "./pages/MensPage";
import WomensPage from "./pages/WomensPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";

// Import the Shop page component
import ShopPage from "./pages/ShopPage";

// Placeholder components for the other routes
const Pages = () => <div>Pages</div>;
const ProductDetails = () => <div>Product Details Page</div>;
const ShopCart = () => <div>Shop Cart Page</div>;
const Checkout = () => <div>Checkout Page</div>;
const BlogDetails = () => <div>Blog Details Page</div>;
const Blog = () => <div>Blog Page</div>;

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Categories />
                            <Products />
                            <Hero />
                            <Trend />
                            <Discount />
                            <Services />
                            <Instagram />
                        </>
                    }
                />
                <Route path="/women" element={<WomensPage />} />
                <Route path="/men" element={<MensPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/product-details" element={<ProductDetails />} />
                <Route path="/shop-cart" element={<ShopCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/blog-details" element={<BlogDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;