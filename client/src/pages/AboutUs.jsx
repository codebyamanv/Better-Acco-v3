import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LeadConsultationCard from "../components/common/LeadConsultationCard";
import { TESTIMONIALS } from "../data/mockData";

export default function AboutUs() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero */}
      <section
        className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">About Us</h1>
            <p className="text-lg text-[#7bbcb0] font-medium">A smarter way to live anywhere in the world</p>

            <div className="space-y-3 text-xs sm:text-sm font-semibold text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
                <span>Our Vision: Global Student Mobility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
                <span>Our Mission: Transparent, Zero-Hassle Accommodations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
                <span>Our Approach: Human-First Expert Assistance</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <span className="text-2xl font-black text-white">72k+</span>
                <p className="text-[11px] text-gray-300">Happy Students</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white">1.5M+</span>
                <p className="text-[11px] text-gray-300">Beds</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white">10+</span>
                <p className="text-[11px] text-gray-300">Countries</p>
              </div>
            </div>
          </div>

          {/* Right Lead Consultation Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <LeadConsultationCard />
          </div>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
          Borders are the worst thing to happen to humanity after natural calamities
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Imagine a world without borders. The world looks a lot more unified on old maps. Maps of today look more like mosaics, like the fragile Earth fell off a shelf and had to have its broken bits pieced back together.
        </p>
        <p className="text-base sm:text-lg font-black text-[#5fa89b]">
          We believe in a border-free world!
        </p>
      </section>

      {/* 3. Our Approach */}
      <section className="bg-gray-50/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Approach</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <SearchOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Easy Search</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Wide-selection of accommodations that fit your preferences, budget, and distance from campus.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <HandshakeOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">No Negotiation</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                See rent upfront. No need to negotiate. Save your time and effort with guaranteed price matching.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <TaskAltOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Hassle-Free</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Forget irritating paperwork. Complete your booking, deposit, and guarantor checks seamlessly online.
              </p>
            </div>
          </div>

          <div>
            <Link
              to="/listings"
              className="inline-block border border-gray-300 hover:border-[#7bbcb0] hover:text-[#5fa89b] text-gray-700 font-semibold px-8 py-2.5 rounded-full text-xs transition bg-white"
            >
              Explore Best Rooms For You
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Look What Our Customers Say!
            </h2>
            <p className="text-xs text-gray-500">
              Students and parents from around the world share their BetterAcco experience.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() =>
                  setTestimonialIdx((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1))
                }
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
                aria-label="Previous testimonial"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
              </button>
              <button
                onClick={() =>
                  setTestimonialIdx((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0))
                }
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
                aria-label="Next testimonial"
              >
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 relative space-y-6">
              <div className="text-[#ffa902]">
                <FormatQuoteIcon sx={{ fontSize: 48 }} />
              </div>
              <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{currentTestimonial.name}</h4>
                    <div className="flex items-center text-[#ffa902]">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: 16 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
