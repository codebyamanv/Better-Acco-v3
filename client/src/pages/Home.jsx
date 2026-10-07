import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PropertyCard from "../components/common/PropertyCard";
import TrendingOffersSection from "../components/common/TrendingOffersSection";
import {
  PROPERTIES,
  POPULAR_CITIES,
  COUNTRIES,
  UNIVERSITIES,
  TESTIMONIALS,
} from "../data/mockData";

export default function Home() {
  const navigate = useNavigate();

  // Search Bar State
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [maxPrice, setMaxPrice] = useState(15000);

  // Country filter for cities
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Testimonials state
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Hero carousel state
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    if (selectedUniversity) params.set("university", selectedUniversity);
    if (postalCode) params.set("postalCode", postalCode);
    if (maxPrice) params.set("maxPrice", maxPrice.toString());
    navigate(`/listings?${params.toString()}`);
  };

  const filteredCities = selectedCountry === "all"
    ? POPULAR_CITIES
    : POPULAR_CITIES.filter((c) => c.countryCode === selectedCountry);

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  const brandLogos = [
    { name: "Google", font: "font-sans font-bold tracking-tight" },
    { name: "amazon", font: "font-serif font-black tracking-tighter" },
    { name: "logitech", font: "font-mono font-bold tracking-wide" },
    { name: "Spotify", font: "font-sans font-extrabold tracking-tight" },
    { name: "SAMSUNG", font: "font-sans font-black tracking-widest" },
    { name: "NETFLIX", font: "font-serif font-black tracking-widest text-red-600" },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#5fa89b" }} />
                Verified Listings
              </span>
              <span className="flex items-center gap-1">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#5fa89b" }} />
                Simplest Bookings
              </span>
              <span className="flex items-center gap-1">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#5fa89b" }} />
                Value For Money
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Book a room that you&apos;ll call home..!
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-lg">
              Book student accommodations near top universities and cities across the globe with zero booking fees and price match guarantee.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/listings"
                className="bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-md transition"
              >
                Explore Rooms
              </Link>
              <Link
                to="/listings"
                className="border border-[#7bbcb0] text-[#5fa89b] hover:bg-[#7bbcb0] hover:text-white font-semibold px-7 py-3 rounded-full text-sm transition"
              >
                Find My Kinda Room
              </Link>
            </div>
          </div>

          {/* Right Hero Image Carousel */}
          <div className="lg:col-span-6">
            <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <img
                src={heroImages[heroSlide]}
                alt="Modern Student Accommodation Room"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      heroSlide === i ? "w-6 bg-[#7bbcb0]" : "w-2 bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Bar (as in Homepage.jpg) */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* City */}
            <div className="lg:col-span-3 border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-4">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                City
              </label>
              <input
                type="text"
                placeholder="Where are you going?"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-sm text-gray-800 font-medium placeholder-gray-400 outline-none mt-1"
              />
            </div>

            {/* University */}
            <div className="lg:col-span-3 border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-4">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                University
              </label>
              <input
                type="text"
                placeholder="Search By University"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full text-sm text-gray-800 font-medium placeholder-gray-400 outline-none mt-1"
              />
            </div>

            {/* Postal Code */}
            <div className="lg:col-span-2 border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-4">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="e.g. B7 4AA"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full text-sm text-gray-800 font-medium placeholder-gray-400 outline-none mt-1"
              />
            </div>

            {/* Price Range */}
            <div className="lg:col-span-3 sm:pr-4">
              <div className="flex justify-between items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Price</span>
                <span className="text-gray-900 font-bold">Up to ₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7bbcb0] mt-2"
              />
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex justify-center sm:justify-end">
              <button
                type="submit"
                className="w-12 h-12 rounded-full bg-[#7bbcb0] hover:bg-[#68aba0] text-white flex items-center justify-center shadow-md transition duration-200"
                aria-label="Search accommodations"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 py-6 border-y border-gray-100">
          <div className="flex items-center gap-4 justify-center">
            <div className="flex -space-x-2">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="User"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="User"
              />
              <div className="h-10 w-10 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                +
              </div>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">72k+ Happy</p>
              <p className="text-xs text-gray-500 font-medium">Students</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-full bg-[#eaf5f3] flex items-center justify-center text-[#5fa89b]">
              <span className="text-xl font-black">🛏</span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">1.5M+</p>
              <p className="text-xs text-gray-500 font-medium">Beds</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-full bg-[#eaf5f3] flex items-center justify-center text-[#5fa89b]">
              <span className="text-xl font-black">🌐</span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">10+</p>
              <p className="text-xs text-gray-500 font-medium">Countries</p>
            </div>
          </div>
        </div>

        {/* Trusted By Logos */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Trusted by 100+ Companies across the globe!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition duration-300">
            {brandLogos.map((brand) => (
              <span key={brand.name} className={`text-xl sm:text-2xl text-gray-700 ${brand.font}`}>
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. EXPLORE POPULAR CITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Explore Popular Cities Across The Globe
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Book student accommodations near top cities and universities around the world.
          </p>

          {/* Country Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {COUNTRIES.map((country) => (
              <button
                key={country.value}
                onClick={() => setSelectedCountry(country.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedCountry === country.value
                    ? "bg-[#7bbcb0] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {country.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredCities.slice(0, 6).map((city) => (
            <Link
              key={city.id}
              to={`/listings?city=${city.name}`}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white border border-gray-100 flex flex-col"
            >
              <div className="h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#5fa89b] transition">
                    {city.name}
                  </h3>
                  <p className="text-xs text-gray-400">{city.country}</p>
                </div>
                <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
                  {city.propertiesCount} Properties
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/listings"
            className="inline-block bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold px-8 py-3 rounded-full text-sm shadow-sm transition"
          >
            View All Cities
          </Link>
        </div>
      </section>

      {/* 3. VALUE PROPOSITIONS */}
      <section className="bg-[#f7fbfa] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Book Your Perfect Room With Us !
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <BoltOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Quick & easy bookings</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Time is money. Save both when you book your student room with us.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <PriceCheckOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Price Match Guarantee</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Find a lower price and we&apos;ll match it. No questions asked.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <SupportAgentOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">24x7 Assistance</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                If you have a doubt or a query, we&apos;re always a call away.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#eaf5f3] text-[#5fa89b] mx-auto flex items-center justify-center">
                <VerifiedUserOutlinedIcon sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">100% Verified Listings</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We promise to deliver what you see on the website.
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

      {/* 4. LATEST LISTED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block mb-1">
              CHECKOUT OUR NEW
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Latest Listed Properties
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-lg">
              Explore affluent and cozy student homes near renowned universities and bustling capitals.
            </p>
          </div>
          <Link
            to="/listings"
            className="border border-gray-300 hover:border-[#7bbcb0] text-gray-700 hover:text-[#5fa89b] px-6 py-2 rounded-full text-xs font-semibold transition"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} layout="vertical" />
          ))}
        </div>
      </section>

      {/* 5. TRENDING REFERRALS & OFFERS */}
      <TrendingOffersSection />

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Look What Our Customers Say!
            </h2>
            <p className="text-sm text-gray-500">
              We love that they love us and we couldn&apos;t be happier with their journey.
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

      {/* 7. HOW IT WORKS / WHO ARE WE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block">
              WHO ARE WE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Booking a student accommodation simpler than ever !
            </h2>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Step 1: Explore and finalize</h4>
                  <p className="text-xs text-gray-500">Filter hundreds of verified listings near your campus.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Step 2: We do the paperwork</h4>
                  <p className="text-xs text-gray-500">Our advisors secure contracts, guarantors, and lease terms.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Step 3: Pack Your bags and land</h4>
                  <p className="text-xs text-gray-500">Check into your brand new room with peace of mind.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="h-80 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                alt="Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="h-38 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
                  alt="Student Room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-38 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
                  alt="Living Area"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARTNER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#7bbcb0] to-[#5fa89b] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Partner Specialist"
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30 hidden sm:block shadow-md"
            />
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black">Partner with us</h3>
              <p className="text-white/90 text-sm max-w-md">
                At betteracco, we offer seamless booking processes and robust sales support to fill your rooms.
              </p>
            </div>
          </div>
          <div>
            <Link
              to="/partner"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 rounded-full text-sm shadow-md transition"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
