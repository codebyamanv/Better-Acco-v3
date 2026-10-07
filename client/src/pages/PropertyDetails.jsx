import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarIcon from "@mui/icons-material/Star";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ThreeDRotationOutlinedIcon from "@mui/icons-material/ThreeDRotationOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import NearbyMapAndTransit from "../components/property/NearbyMapAndTransit";
import { PROPERTIES, FAQS } from "../data/mockData";
import { submitLeadConsultation } from "../services/api";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = PROPERTIES.find((p) => p.id === id) || PROPERTIES[0];

  const [activeMediaTab, setActiveMediaTab] = useState("photos");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showMoreFaqs, setShowMoreFaqs] = useState(false);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [activeOfferModal, setActiveOfferModal] = useState(null);
  const [activeWaitlistModal, setActiveWaitlistModal] = useState(null);
  const [activePolicyModal, setActivePolicyModal] = useState(null);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({ name: "", email: "", phone: "", intake: "September 2025" });
  const [copiedCode, setCopiedCode] = useState(false);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistLoading(true);
    try {
      await submitLeadConsultation({
        fullName: waitlistForm.name,
        email: waitlistForm.email,
        phone: waitlistForm.phone,
        city: property.city,
        preferredTerm: waitlistForm.intake,
        preferredRoomType: activeWaitlistModal?.tier?.name || "Room Waitlist",
        notes: `Waitlist request for ${property.title} - ${activeWaitlistModal?.tier?.name} (${activeWaitlistModal?.variant?.note || ""})`,
      });
    } catch (err) {
      console.error("Waitlist error:", err);
    } finally {
      setWaitlistLoading(false);
      setWaitlistSubmitted(true);
    }
  };

  const images = property.images || [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  ];

  const cancellationPolicies = [
    { title: "Cooling Off Period", desc: "You have a 7-day cooling off period after signing the agreement to cancel with a full refund." },
    { title: "No Visa No Pay", desc: "If your student visa is officially rejected, provide documentation within 72 hours for a 100% refund." },
    { title: "No Place No Pay", desc: "If you do not get accepted into your chosen university, provide proof of rejection to cancel without penalty." },
    { title: "Extenuating Circumstances", desc: "Emergency cancellations are evaluated individually with minimal administrative charges." },
  ];

  const paymentPolicies = [
    { title: "Booking Deposit", desc: "A holding deposit of £100–£250 is required to secure the room, which is credited toward your first installment." },
    { title: "Payment Instalment Plan", desc: "Pay in 1, 3, or 4 convenient term installments aligned with your student loan dates." },
    { title: "Mode Of Payment", desc: "Credit/Debit Card, Direct Bank Transfer, or International Student Transfer via Flywire." },
    { title: "Guarantor Requirement", desc: "UK-based guarantor required for installment plans, or use HousingHand / pay in full upfront." },
  ];

  const handleBookClick = (roomTier, variant) => {
    setSelectedRoomForBooking({ tier: roomTier.name, ...variant });
    setBookingSuccessModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-gray-400 flex items-center gap-1.5">
        <Link to="/" className="hover:text-gray-700">United Kingdom</Link>
        <span>/</span>
        <Link to="/country/united-kingdom" className="hover:text-gray-700">England</Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">{property.city}</span>
      </nav>

      {/* 2. Gallery Grid */}
      <div className="space-y-3">
        {activeMediaTab === "photos" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[320px] sm:h-[460px] rounded-2xl overflow-hidden">
            {/* Main Photo (left 8 cols) */}
            <div className="md:col-span-8 h-full bg-gray-100 overflow-hidden relative">
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-102 transition duration-500"
              />
            </div>

            {/* 3 Stacked Photos (right 4 cols) */}
            <div className="hidden md:grid md:col-span-4 grid-rows-3 gap-3 h-full">
              <div className="h-full bg-gray-100 overflow-hidden">
                <img
                  src={images[1]}
                  alt="Room detail"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="h-full bg-gray-100 overflow-hidden">
                <img
                  src={images[2]}
                  alt="Amenities detail"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="h-full bg-gray-100 overflow-hidden relative group cursor-pointer">
                <img
                  src={images[3]}
                  alt="Common area"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                  +17
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMediaTab === "videos" && (
          <div className="relative h-[320px] sm:h-[460px] rounded-2xl overflow-hidden bg-gray-950 flex items-center justify-center">
            <img
              src={images[0]}
              alt="Video Preview"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3 p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#7bbcb0] text-white flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
                <PlayCircleOutlineIcon sx={{ fontSize: 44 }} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Watch Walkthrough Video Tour</h4>
                <p className="text-xs text-gray-300">Take a guided tour of the bedrooms, social lounge, and study areas</p>
              </div>
            </div>
          </div>
        )}

        {activeMediaTab === "3d" && (
          <div className="relative h-[320px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src={images[1]}
              alt="3D Tour Preview"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white space-y-2">
              <span className="bg-[#5fa89b] text-white text-xs font-bold px-3 py-1 rounded-full self-start">
                360° Interactive 3D Model
              </span>
              <h4 className="text-xl font-bold">Explore Rooms in 3D Space</h4>
              <p className="text-xs text-gray-200 max-w-md">
                Rotate 360 degrees, inspect storage, and explore full floor layouts.
              </p>
            </div>
          </div>
        )}

        {/* Gallery Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-gray-100 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMediaTab("photos")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition ${
                activeMediaTab === "photos"
                  ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <PhotoCameraOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setActiveMediaTab("videos")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition ${
                activeMediaTab === "videos"
                  ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <VideocamOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setActiveMediaTab("3d")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition ${
                activeMediaTab === "3d"
                  ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <ThreeDRotationOutlinedIcon sx={{ fontSize: 16 }} />
              <span>3D Views</span>
            </button>
            <button
              onClick={() => {
                setActiveMediaTab("map");
                const el = document.getElementById("map");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition ${
                activeMediaTab === "map"
                  ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <MapOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Map View</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
            <StarIcon sx={{ fontSize: 16, color: "#ffa902" }} />
            <span>{property.rating || 4.3}</span>
            <span className="text-gray-400 font-normal">({property.reviewsCount || 3}+ reviews)</span>
          </div>
        </div>
      </div>

      {/* 3. Title & Tags */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{property.title}</h1>
          <span className="bg-[#eaf5f3] text-[#5fa89b] text-xs font-bold px-3 py-1 rounded-full border border-[#7bbcb0]/30">
            {property.offersCount || 2} Offers
          </span>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#7bbcb0" }} />
          <span>{property.address}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-600 font-medium">{property.distanceFromCenter}</span>
          <span className="text-gray-300">•</span>
          <a href="#map" className="text-[#5fa89b] underline font-semibold">
            View on Map
          </a>
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {property.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium"
            >
              ⚡ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Offers Box */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Offers ({property.offers?.length || 2})
        </h3>
        <div className="space-y-3">
          {property.offers?.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100 gap-2"
            >
              <div className="flex items-center gap-2.5 text-xs font-medium text-gray-800">
                <span className="w-5 h-5 rounded-full bg-white text-gray-700 flex items-center justify-center font-bold text-[10px] shadow-2xs">
                  {offer.id}
                </span>
                <span>{offer.title}</span>
              </div>
              <button
                onClick={() => {
                  setActiveOfferModal(offer);
                  setCopiedCode(false);
                }}
                className="text-xs font-bold text-[#5fa89b] hover:text-[#4a9184] uppercase tracking-wider px-3 py-1 rounded-lg hover:bg-[#7bbcb0]/10 transition"
              >
                Avail
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Description */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900">Description</h3>
        <p
          className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${
            showFullDescription ? "" : "line-clamp-3"
          }`}
        >
          {property.description}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-xs font-bold text-[#5fa89b] hover:underline flex items-center gap-1"
        >
          {showFullDescription ? "View less description" : "View full description"}{" "}
          {showFullDescription ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>

      {/* 6. What will you get */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-gray-900">What will you get</h3>

        {/* Bills Included */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Bills Included
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.billsIncluded?.map((bill) => (
              <div key={bill.name} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <CheckCircleIcon sx={{ fontSize: 16, color: "#5fa89b" }} />
                <span>{bill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Amenities */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Common Amenities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {property.amenities?.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 text-xs text-gray-700">
                <span className="text-[#5fa89b]">☕</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Room Types */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-bold text-gray-900">
            Room Types ({property.roomTypes?.length || 4})
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white font-medium text-gray-700 outline-none"
            >
              <option value="all">Stay Duration: All</option>
              <option value="51">51 weeks</option>
              <option value="44">44 weeks</option>
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white font-medium text-gray-700 outline-none"
            >
              <option value="all">Move In Month: All</option>
              <option value="sep">Sep 2024</option>
              <option value="oct">Oct 2024</option>
            </select>

            <button
              onClick={() => {
                setSelectedDuration("all");
                setSelectedMonth("all");
              }}
              className="text-[#5fa89b] font-semibold hover:underline px-2"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Room Tiers List */}
        <div className="space-y-6">
          {property.roomTypes?.map((tier) => (
            <div
              key={tier.id}
              className="border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#7bbcb0] transition"
            >
              {/* Tier Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={tier.image}
                    alt={tier.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold">{tier.priceRange}</p>
                    <p className="text-[11px] text-gray-400">Available From: {tier.availableFrom}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
                  {tier.specs?.map((spec) => (
                    <span key={spec} className="bg-gray-100 px-2.5 py-1 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tier Variants */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                {tier.variants?.map((v) => (
                  <div
                    key={v.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 gap-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center gap-4 text-gray-700">
                      <span className="font-semibold">Duration: {v.duration}</span>
                      <span>Move In: {v.moveIn}</span>
                      <span className="text-gray-400">Note: {v.note}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {v.status === "available" ? (
                        <>
                          <span className="font-extrabold text-sm text-gray-900">
                            {property.currencySymbol || "£"}
                            {v.price}/week
                          </span>
                          <button
                            onClick={() => handleBookClick(tier, v)}
                            className="bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-bold px-4 py-1.5 rounded-lg transition"
                          >
                            Book &gt;
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                            Sold out
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            {property.currencySymbol || "£"}
                            {v.price}/week
                          </span>
                          <button
                            onClick={() => {
                              setActiveWaitlistModal({ tier, variant: v });
                              setWaitlistSubmitted(false);
                            }}
                            className="border border-[#7bbcb0] text-[#5fa89b] hover:bg-[#7bbcb0] hover:text-white font-bold px-3 py-1.5 rounded-lg transition"
                          >
                            Join Waitlist
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cancellation Policies */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">Cancellation Policies</h3>
          <div className="space-y-2">
            {cancellationPolicies.map((p) => (
              <div key={p.title} className="border border-gray-100 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800">{p.title}</span>
                  <button
                    onClick={() => setActivePolicyModal(p)}
                    className="text-xs font-bold text-[#5fa89b] hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Policies */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">Payment Policies</h3>
          <div className="space-y-2">
            {paymentPolicies.map((p) => (
              <div key={p.title} className="border border-gray-100 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800">{p.title}</span>
                  <button
                    onClick={() => setActivePolicyModal(p)}
                    className="text-xs font-bold text-[#5fa89b] hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. Map & Nearby Locations */}
      <div id="map">
        <NearbyMapAndTransit property={property} />
      </div>

      {/* 10. Frequently Asked Questions */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Frequently Asked Questions</h3>
          <span className="text-xs text-gray-400 font-medium">({FAQS.length} answers)</span>
        </div>
        <div className="space-y-3">
          {(showMoreFaqs ? FAQS : FAQS.slice(0, 4)).map((faq, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-4 transition-all">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <h4 className="text-sm font-semibold text-gray-800">{faq.q}</h4>
                <span className="text-gray-400">
                  {expandedFaq === idx ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                  )}
                </span>
              </div>
              {expandedFaq === idx && (
                <p className="text-xs text-gray-600 leading-relaxed pt-3 border-t border-gray-100 mt-3 animate-in fade-in duration-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {FAQS.length > 4 && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setShowMoreFaqs(!showMoreFaqs)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5fa89b] hover:text-[#46867a] hover:underline cursor-pointer py-1 px-3 rounded-full hover:bg-[#eaf5f3] transition"
            >
              <span>{showMoreFaqs ? "Show less" : `Show more (${FAQS.length - 4})`}</span>
              {showMoreFaqs ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
              )}
            </button>
          </div>
        )}
      </div>

      {/* 11. Reviews Section */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-gray-900">
            Reviews ({property.reviews?.length || 3})
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-800 bg-[#eaf5f3] px-2.5 py-1 rounded-md">
            <StarIcon sx={{ fontSize: 16, color: "#ffa902" }} />
            <span>{property.rating || 4.3}</span>
            <span className="text-gray-400">({property.reviewsCount || 3} ratings)</span>
          </div>
        </div>

        <div className="space-y-4">
          {property.reviews?.map((r) => (
            <div key={r.id} className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={r.avatar}
                    alt={r.author}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">{r.author}</h5>
                    <p className="text-[10px] text-gray-400">{r.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  <span>{r.rating}</span>
                  <span>★</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 12. Active Offer Modal */}
      {activeOfferModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setActiveOfferModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eaf5f3] text-[#5fa89b] flex items-center justify-center font-extrabold text-xl shadow-xs">
                %
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5fa89b] bg-[#eaf5f3] px-2.5 py-0.5 rounded-full">
                  Special Offer
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{activeOfferModal.title}</h3>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Use this code during booking or share it with your dedicated BetterAcco advisor to apply your promotional discount to your room contract.
            </p>

            {/* Promo Code Box */}
            <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-dashed border-[#7bbcb0] rounded-xl">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">Promo Code</span>
                <span className="text-sm font-mono font-bold text-gray-900 tracking-wider">
                  {`BETTER-${activeOfferModal.id || "DEAL"}-2024`}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`BETTER-${activeOfferModal.id || "DEAL"}-2024`);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2500);
                }}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition ${
                  copiedCode
                    ? "bg-emerald-600 text-white"
                    : "bg-[#7bbcb0] hover:bg-[#68a79b] text-white shadow-xs"
                }`}
              >
                {copiedCode ? (
                  <>
                    <CheckIcon sx={{ fontSize: 16 }} /> Copied!
                  </>
                ) : (
                  <>
                    <ContentCopyIcon sx={{ fontSize: 16 }} /> Copy Code
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-gray-400 space-y-1">
              <p>• Valid for reservations booked for Academic Year 2024/25.</p>
              <p>• Verified instantly against your student ID upon tenancy approval.</p>
            </div>

            <button
              onClick={() => setActiveOfferModal(null)}
              className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-3 rounded-xl transition"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

      {/* 13. Active Waitlist Modal */}
      {activeWaitlistModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setActiveWaitlistModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>

            {waitlistSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gray-900">Waitlist Registered!</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  You are now on the priority waitlist for <strong>{activeWaitlistModal.tier?.name}</strong> at{" "}
                  <strong>{property.title}</strong>. As soon as a cancellation or additional release occurs, our team will notify you immediately.
                </p>
                <button
                  onClick={() => setActiveWaitlistModal(null)}
                  className="bg-[#7bbcb0] hover:bg-[#68a79b] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md transition"
                >
                  Got it, thanks!
                </button>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Priority Waitlist
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    Join Waitlist for {activeWaitlistModal.tier?.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {property.title} • {activeWaitlistModal.variant?.note || "Standard Room"} • {property.currencySymbol || "£"}{activeWaitlistModal.variant?.price}/week
                  </p>
                </div>

                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={waitlistForm.name}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#7bbcb0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@university.ac.uk"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#7bbcb0]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700">Phone / WhatsApp</label>
                      <input
                        required
                        type="tel"
                        placeholder="+44 7700 900077"
                        value={waitlistForm.phone}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#7bbcb0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Preferred Intake / Move-in</label>
                    <select
                      value={waitlistForm.intake}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, intake: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#7bbcb0] bg-white"
                    >
                      <option value="September 2024">September 2024 (Fall Semester)</option>
                      <option value="January 2025">January 2025 (Spring Semester)</option>
                      <option value="September 2025">September 2025 (Next Academic Year)</option>
                    </select>
                  </div>

                  <p className="text-[11px] text-gray-400">
                    * By joining the waitlist, you will receive real-time SMS & email notifications when slots open up.
                  </p>

                  <button
                    type="submit"
                    disabled={waitlistLoading}
                    className="w-full bg-[#7bbcb0] hover:bg-[#68a79b] text-white text-xs font-bold py-3 rounded-xl transition shadow-md disabled:opacity-50"
                  >
                    {waitlistLoading ? "Joining Waitlist..." : "Confirm Waitlist Spot"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* 14. Active Policy Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5fa89b] bg-[#eaf5f3] px-2.5 py-0.5 rounded-full">
                Official Policy
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{activePolicyModal.title}</h3>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3 text-xs text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900">{activePolicyModal.desc}</p>
              <div className="space-y-1.5 text-gray-500 pt-2 border-t border-gray-200">
                <p>• <strong>Eligibility:</strong> Applies to all verified students with an active or pending booking with BetterAcco.</p>
                <p>• <strong>Submission Window:</strong> Required proof/documentation must be uploaded through the student dashboard or sent to support@betteracco.com within 72 hours of notice.</p>
                <p>• <strong>Refund Timeline:</strong> Once processed and approved, refunds are credited to the original payment method within 5-10 business days.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded-xl transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. Booking Modal */}
      {bookingSuccessModal && selectedRoomForBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900">Booking Request Placed!</h3>
            <p className="text-xs text-gray-600">
              You selected <strong>{selectedRoomForBooking.tier}</strong> ({selectedRoomForBooking.note}) at{" "}
              <strong>
                {property.currencySymbol || "£"}
                {selectedRoomForBooking.price}/week
              </strong>
              .
            </p>
            <p className="text-xs text-gray-500">
              A BetterAcco booking specialist has reserved your slot and will verify your student status.
            </p>
            <button
              onClick={() => setBookingSuccessModal(false)}
              className="w-full bg-[#7bbcb0] text-white font-bold py-3 rounded-full text-xs shadow-md transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

