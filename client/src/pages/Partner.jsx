import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import LeadConsultationCard from "../components/common/LeadConsultationCard";
import AddListingModal from "../components/partner/AddListingModal";

export default function Partner() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [addListingOpen, setAddListingOpen] = useState(false);


  const partnerFaqs = [
    {
      q: "How long after filling the form will someone from the team contact me?",
      a: "Our partner onboarding specialists reach out within 24 hours of form submission to verify your properties and configure your dashboard.",
    },
    {
      q: "How extensive is BetterAcco's reach?",
      a: "We connect property owners with over 300,000 verified students from 120+ countries each academic year across UK, US, Europe, and Australia.",
    },
    {
      q: "What is a partner dashboard?",
      a: "The BetterAcco Partner Dashboard allows landlords to update live room inventory, manage dynamic pricing, view student inquiries, and accept reservation deposits.",
    },
    {
      q: "How to track your leads?",
      a: "You get automated email, SMS, and dashboard alerts the second a student inquires or reserves a room tier.",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero with Lead Form */}
      <section
        className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Partner with us
            </h1>
            <p className="text-lg text-[#7bbcb0] font-medium">A smarter way to fill your rooms</p>

            <div className="space-y-3 text-xs sm:text-sm font-semibold text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
                <span>Zero Listing Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
                <span>Expand your accommodation portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
                <span>Enjoy personalized support and valuable insights</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => setAddListingOpen(true)}
                className="w-full sm:w-auto bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition cursor-pointer"
              >
                Partner with us
              </button>

              <div className="pt-2">
                <p className="text-xs text-gray-300 mb-2">Already Registered?</p>
                <button
                  onClick={() => navigate("/auth-handler/login")}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-2.5 rounded-xl text-xs border border-white/20 transition"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* Right Consultation Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <LeadConsultationCard />
          </div>
        </div>
      </section>

      {/* 2. Why Partner With Us (Stats) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Why Partner With Us</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Reach out to the right audience, establish a brand, and yield the highest ROIs. Get started with your journey with BetterAcco today.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left py-6 border-y border-gray-100">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#5fa89b]">25+</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Countries and Regions</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#5fa89b]">16,000+</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Properties across the globe</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#5fa89b]">300K</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Students helped each year</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#5fa89b]">1M+</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Beds to choose from</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#5fa89b]">30,000+</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Students booked an accommodation with us</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#5fa89b]">250+</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Cities across UK, Ire, Australia and US</p>
          </div>
        </div>
      </section>

      {/* 3. How Does It Work */}
      <section className="bg-gray-50/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">How Does it Work</h2>
            <p className="text-xs text-gray-500">
              Getting seen by millions of students across the globe is now possible in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-bold">
                <DescriptionOutlinedIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900">1. Affiliate Link</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Fill out a simple contact form with your property portfolio and get started instantly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-bold">
                <ContactPhoneOutlinedIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900">2. Get Contacted</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We will contact you within just 24 hours to discuss terms, commission structures, and finalize onboarding.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-bold">
                <AutoAwesomeOutlinedIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900">3. Enhance your student offerings</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Add accommodation provisions to your portfolio and help more students find safe, verified homes easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Partners Logos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Our Partners</h2>
          <p className="text-xs text-gray-500">Book places in major cities and universities across the globe</p>
        </div>

        {/* Brand Partners */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
            Brand Partners
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {["EduCred", "MiM-Essay", "KC Overseas", "LeapScholar", "Yocket", "iSchoolConnect", "ErasmusPlay", "Study Smart"].map(
              (brand) => (
                <div
                  key={brand}
                  className="p-3 border border-gray-100 rounded-xl bg-white text-center font-bold text-xs text-gray-600 shadow-2xs hover:shadow-xs"
                >
                  {brand}
                </div>
              )
            )}
          </div>
        </div>

        {/* University Partners */}
        <div className="space-y-4 pt-4">
          <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
            University Partners
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {["Torrens University Australia", "Liffey College", "Global Study Partners", "James Cook University"].map(
              (uni) => (
                <div
                  key={uni}
                  className="p-4 border border-gray-100 rounded-xl bg-white text-center font-bold text-xs text-gray-700 shadow-2xs hover:shadow-xs"
                >
                  🎓 {uni}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* 5. Partner FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {partnerFaqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <h4 className="text-sm font-bold text-gray-800">{faq.q}</h4>
                <span>{expandedFaq === idx ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
              </div>
              {expandedFaq === idx && (
                <p className="text-xs text-gray-600 leading-relaxed pt-3 border-t border-gray-100 mt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Add Listing Wizard Modal */}
      <AddListingModal
        isOpen={addListingOpen}
        onClose={() => setAddListingOpen(false)}
        onPropertyAdded={() => {
          navigate("/listings");
        }}
      />
    </div>
  );
}

