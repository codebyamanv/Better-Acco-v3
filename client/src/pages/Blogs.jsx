import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BLOGS } from "../data/mockData";

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero */}
      <section
        className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">In the News</h1>
            <p className="text-base text-gray-200">Your Guide to the Best Student Accommodations</p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                Verified Listings
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                Simplest Bookings
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
                Value For Money
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white">72k+</span>
              <span className="text-xs text-gray-300 font-medium">Happy Students</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white">1.5M+</span>
              <span className="text-xs text-gray-300 font-medium">Beds</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white">10+</span>
              <span className="text-xs text-gray-300 font-medium">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Explore Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Explore</h2>
          <p className="text-xs text-gray-500">Guides, city reports, and student living tips from our editorial team</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition duration-300 border border-gray-100 flex flex-col group cursor-pointer"
            >
              <div className="h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#5fa89b] transition line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>

                <div className="text-xs text-gray-500 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[#ffa902] font-semibold">{blog.category}</span>
                  <span>By {blog.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 pt-6 text-xs font-bold text-gray-700">
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === 1 ? "bg-[#7bbcb0] text-white" : "hover:bg-gray-100"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === 2 ? "bg-[#7bbcb0] text-white" : "hover:bg-gray-100"
            }`}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === 3 ? "bg-[#7bbcb0] text-white" : "hover:bg-gray-100"
            }`}
          >
            3
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500"
            aria-label="Next page"
          >
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
          </button>
        </div>
      </section>
    </div>
  );
}
