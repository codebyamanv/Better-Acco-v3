import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AuthHandler() {

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Form Area */}
        <div className="lg:col-span-6 max-w-md mx-auto w-full py-6">
          {/* Logo */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <img
                src="/assets/images/nav-log.png"
                alt="BetterAcco"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <span className="text-2xl font-black text-gray-900 hidden">
                Better<span className="text-[#7bbcb0]">Acco</span>
              </span>
            </Link>
          </div>

          <Outlet />
        </div>

        {/* Right Visual Image Carousel (as in Design/Login/Login.png) */}
        <div className="hidden lg:block lg:col-span-6 h-[640px] relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={slides[activeSlide]}
            alt="BetterAcco Accommodation"
            className="w-full h-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx ? "w-6 h-2 bg-[#7bbcb0]" : "w-2 h-2 bg-white/80 hover:bg-white"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
