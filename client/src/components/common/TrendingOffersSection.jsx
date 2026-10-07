import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import SchoolIcon from "@mui/icons-material/School";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export default function TrendingOffersSection() {
  const [modalType, setModalType] = useState(null); // "referral" | "scholarship" | "acco_plus"
  const [copied, setCopied] = useState(false);
  const [scholarshipSubmitted, setScholarshipSubmitted] = useState(false);

  const referralCode = "ACCO50-FRIEND";
  const referralLink = `https://betteracco.com/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const offers = [
    {
      id: "acco_plus",
      date: "28 Tue",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      title: "Save up to £300 with BetterAcco+",
      description: "Get exclusive discounts from 150+ trusted partners at this one-stop student platform.",
      actionText: "Learn More",
    },
    {
      id: "referral",
      date: "08 Mon",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      title: "Win £50 in just a few steps! Refer a friend and earn your reward",
      description: "Turn connections into rewards. Get credited £50 directly into your bank after their successful booking.",
      actionText: "Get Referral Code",
    },
    {
      id: "scholarship",
      date: "26 Wed",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      title: "Unlock your academic dreams in the UK with betteracco scholarship!",
      description: "Save £5,000 and turn your education dreams into a reality. Applications open for Autumn term.",
      actionText: "Apply Now",
    },
  ];

  return (
    <section className="bg-[#5fa89b] py-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-100">
            WHAT&apos;S TRENDING
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Latest Referrals & Offers
          </h2>
        </div>

        {/* 3 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white/10 backdrop-blur-xs rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition duration-300 flex flex-col group"
            >
              {/* Image thumbnail with Date badge */}
              <div className="relative h-52 w-full overflow-hidden bg-black/20">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 text-gray-900 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md">
                  {offer.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-teal-100 transition">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setModalType(offer.id)}
                    className="text-xs font-bold text-teal-100 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span>{offer.actionText}</span>
                  </button>
                  <button
                    onClick={() => setModalType(offer.id)}
                    className="w-10 h-10 rounded-full bg-white text-[#5fa89b] flex items-center justify-center shadow-md hover:scale-110 transition group-hover:bg-teal-50"
                    aria-label={offer.title}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator bar matching design */}
        <div className="flex justify-center items-center gap-2 pt-2">
          <span className="w-8 h-1.5 bg-white rounded-full" />
          <span className="w-2 h-1.5 bg-white/40 rounded-full" />
          <span className="w-2 h-1.5 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Referral Modal */}
      {modalType === "referral" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-gray-900 shadow-2xl relative space-y-6">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#7bbcb0]/20 text-[#5fa89b] flex items-center justify-center">
              <CardGiftcardIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Refer a Friend & Earn £50</h3>
              <p className="text-xs text-gray-500">
                Share your invite code with friends. Once they book student accommodation, you both receive £50 cashback!
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Your Unique Invite Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="bg-gray-50 border border-gray-200 text-xs px-3.5 py-2.5 rounded-xl w-full text-gray-700 font-mono outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="bg-[#7bbcb0] hover:bg-[#68aba0] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                >
                  {copied ? <CheckIcon sx={{ fontSize: 16 }} /> : <ContentCopyIcon sx={{ fontSize: 16 }} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scholarship Modal */}
      {modalType === "scholarship" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-gray-900 shadow-2xl relative space-y-6">
            <button
              onClick={() => {
                setModalType(null);
                setScholarshipSubmitted(false);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <SchoolIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">BetterAcco £5,000 Global Scholarship</h3>
              <p className="text-xs text-gray-500">
                Helping ambitious international students fund their living and accommodation expenses in the UK and worldwide.
              </p>
            </div>

            {scholarshipSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-xs space-y-1">
                <p className="font-bold">Application Received!</p>
                <p>Our education committee will review your profile and reach out via email within 5 business days.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setScholarshipSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs w-full outline-none focus:border-[#7bbcb0]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Target University & Degree
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of Manchester, MSc Data Science"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs w-full outline-none focus:border-[#7bbcb0]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@student.ac.uk"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs w-full outline-none focus:border-[#7bbcb0]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm transition"
                >
                  Submit Scholarship Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* BetterAcco+ Modal */}
      {modalType === "acco_plus" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-gray-900 shadow-2xl relative space-y-4">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <h3 className="text-xl font-bold">BetterAcco+ Membership</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every booking automatically enrolls you into <strong>BetterAcco+</strong>. Enjoy complimentary perks:
            </p>
            <ul className="text-xs text-gray-700 space-y-2 list-disc list-inside">
              <li>Up to £300 cashback on eligible 44+ week academic year leases</li>
              <li>Free airport pickup transfer voucher with partner transit providers</li>
              <li>SIM card and UK bank account pre-arrival setup assistance</li>
              <li>Priority 24/7 student support line</li>
            </ul>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="bg-[#7bbcb0] text-white px-5 py-2 rounded-xl text-xs font-semibold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
