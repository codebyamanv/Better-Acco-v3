import React from "react";
import { Link, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import LeadConsultationCard from "../components/common/LeadConsultationCard";
import PropertyCard from "../components/common/PropertyCard";
import { POPULAR_CITIES, UNIVERSITIES, PROPERTIES } from "../data/mockData";

export default function CountryListing() {
  const { slug } = useParams();
  const countryName = slug === "united-kingdom" || !slug ? "United Kingdom" : slug.replace("-", " ");

  const ukCities = POPULAR_CITIES.filter(
    (c) => c.countryCode === "united-kingdom" || c.name === "London" || c.name === "Birmingham"
  );

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero with Lead Form */}
      <section
        className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Trust Stats */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Student Accommodation in{" "}
              <span className="text-[#7bbcb0] underline decoration-[#7bbcb0] decoration-wavy">
                {countryName}
              </span>
            </h1>

            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-200">
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                Exclusive Offers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                Free of Cost Service
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                Easy Cancellations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                No Booking Charges
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl">
                <span className="text-xl font-bold">4.9</span>
                <div className="text-[10px] text-gray-300">
                  <div className="flex text-emerald-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 14 }} />
                    ))}
                  </div>
                  <span>Trustpilot Reviews</span>
                </div>
              </div>

              <div>
                <p className="text-lg font-bold text-white">72k+ Happy</p>
                <p className="text-xs text-gray-400">Students</p>
              </div>

              <div>
                <p className="text-lg font-bold text-white">1.5M+</p>
                <p className="text-xs text-gray-400">Beds</p>
              </div>
            </div>

            <div className="bg-[#7bbcb0]/20 border border-[#7bbcb0]/40 rounded-xl p-3 text-xs text-white flex items-center justify-between">
              <span>
                🎁 <strong>Get £100 Cashback + Free Bedding Pack</strong>
              </span>
              <Link to="/listings" className="text-[#7bbcb0] font-bold underline hover:text-white">
                Book with us now!
              </Link>
            </div>
          </div>

          {/* Right Lead Consultation Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <LeadConsultationCard />
          </div>
        </div>
      </section>

      {/* 2. Popular Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Popular Cities in the {countryName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ukCities.map((city) => (
            <Link
              key={city.id}
              to={`/listings?city=${city.name}`}
              className="group rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition duration-300 bg-white border border-gray-100 flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#5fa89b]">
                  {city.name}
                </h3>
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                  {city.propertiesCount} Properties
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/listings"
            className="inline-block bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold px-8 py-2.5 rounded-full text-xs shadow-sm transition"
          >
            View All Cities
          </Link>
        </div>
      </section>

      {/* 3. Universities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Book Your Perfect Room With Us !
          </h2>
          <p className="text-xs text-gray-500">Discover verified accommodations near your campus</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {UNIVERSITIES.slice(0, 8).map((u) => (
            <Link
              key={u.id}
              to={`/listings?university=${encodeURIComponent(u.name)}`}
              className="group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xs hover:shadow-md transition"
            >
              <div className="h-28 w-full overflow-hidden bg-gray-100">
                <img
                  src={u.image}
                  alt={u.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3">
                <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-[#5fa89b]">
                  {u.name}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{u.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Latest Listed Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block mb-1">
              CHECKOUT OUR NEW
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Latest Listed Properties
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROPERTIES.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} layout="vertical" />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact Us / Let Us Help Your Search with Chat Mockup */}
      <section className="bg-[#7bbcb0]/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider">
              CONTACT US
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">Let Us Help Your Search</h2>
            <div className="flex justify-center gap-4 text-xs font-semibold text-gray-700 pt-2">
              <span>✓ Verified Listings</span>
              <span>✓ Simplest Bookings</span>
              <span>✓ Value For Money</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            {/* Left Lead Form */}
            <div className="lg:col-span-7">
              <LeadConsultationCard />
            </div>

            {/* Right Chat Mockup */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 max-w-xs ml-auto">
                <p className="text-[11px] font-bold text-gray-400 mb-1">Charlie, user</p>
                <p className="text-xs text-gray-800">
                  Please help me find accommodation near Birmingham City University! 🏡
                </p>
              </div>

              <div className="bg-[#5fa89b] text-white p-4 rounded-2xl shadow-md max-w-xs">
                <p className="text-[11px] font-bold text-white/80 mb-1">Adarsh, BetterAcco Expert</p>
                <p className="text-xs">
                  Hi Charlie! Don&apos;t worry, we got it from here :) We have reserved 3 studio options within 5 minutes walk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
