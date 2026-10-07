import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import PropertyListings from "./pages/PropertyListings";
import PropertyDetails from "./pages/PropertyDetails";
import Compare from "./pages/Compare";
import CountryListing from "./pages/CountryListing";
import Profile from "./pages/Profile";
import Partner from "./pages/Partner";
import Blogs from "./pages/Blogs";
import AboutUs from "./pages/AboutUs";
import AuthHandler from "./pages/AuthHandler";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <Routes>
        {/* Main Application Shell with TopBar, Navbar, and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<PropertyListings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/country/:slug" element={<CountryListing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        {/* Authentication Routes (Split-screen with Carousel) */}
        <Route path="/auth-handler" element={<AuthHandler />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Convenience Redirects */}
        <Route path="/login" element={<Navigate to="/auth-handler/login" replace />} />
        <Route path="/register" element={<Navigate to="/auth-handler/register" replace />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
