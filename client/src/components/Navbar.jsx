import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import AddListingModal from "./partner/AddListingModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addListingOpen, setAddListingOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Listings", path: "/listings" },
    { name: "Services", path: "/compare" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Nav items on desktop */}
          <div className="hidden lg:flex items-center space-x-2 w-2/5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-semibold transition duration-200 ${
                    isActive
                      ? "bg-[#7bbcb0] text-white shadow-xs"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Center: Brand Logo */}
          <div className="flex items-center justify-center lg:w-1/5">
            <Link to="/" className="flex items-center gap-1">
              <img
                src="/assets/images/nav-log.png"
                alt="BetterAcco"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="text-2xl font-black tracking-tight text-gray-900 hidden">
                Better<span className="text-[#7bbcb0]">Acco</span>
              </span>
            </Link>
          </div>

          {/* Right: Action Buttons */}
          <div className="hidden lg:flex items-center justify-end space-x-3 w-2/5">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-[#5fa89b] rounded-full hover:bg-gray-50 transition border border-gray-200"
                  title="View Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-[#7bbcb0] text-white flex items-center justify-center text-xs font-bold uppercase">
                    {user?.firstName ? user.firstName[0] : "U"}
                  </div>
                  <span className="max-w-[120px] truncate">{user?.firstName || "Account"}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  title="Logout"
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition"
                >
                  <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth-handler/login")}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#5fa89b] transition"
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />
                <span>Login/Register</span>
              </button>
            )}

            <button
              onClick={() => setAddListingOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold text-sm px-4 py-2 rounded-full shadow-xs transition duration-200 cursor-pointer"
            >
              <AddHomeOutlinedIcon sx={{ fontSize: 18 }} />
              <span>Add Listing</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => navigate(isAuthenticated ? "/profile" : "/auth-handler/login")}
              className="p-1.5 text-gray-700 hover:text-[#5fa89b]"
              aria-label="Account"
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: 22 }} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-700 hover:text-[#5fa89b]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-semibold ${
                  isActive ? "bg-[#7bbcb0] text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <AccountCircleOutlinedIcon sx={{ fontSize: 20, color: "#7bbcb0" }} />
                  <span>My Profile ({user?.firstName || "Account"})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate("/");
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <LogoutOutlinedIcon sx={{ fontSize: 20 }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/auth-handler/login");
                }}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />
                <span>Login / Register</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAddListingOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#7bbcb0] text-white font-semibold text-sm py-2.5 rounded-full cursor-pointer"
            >
              <AddHomeOutlinedIcon sx={{ fontSize: 18 }} />
              <span>Add Listing</span>
            </button>
          </div>
        </div>
      )}

      {/* Landlord Add Listing Modal */}
      <AddListingModal
        isOpen={addListingOpen}
        onClose={() => setAddListingOpen(false)}
        onPropertyAdded={() => {
          navigate("/listings");
        }}
      />
    </nav>
  );
}