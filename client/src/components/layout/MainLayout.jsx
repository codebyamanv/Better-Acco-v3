import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "../Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 text-gray-800 antialiased font-sans">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
