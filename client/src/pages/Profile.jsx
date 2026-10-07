import React, { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PropertyCard from "../components/common/PropertyCard";
import { PROPERTIES } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const { shortlistedProperties, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "Yash",
    lastName: user?.lastName || "Ghori",
    email: user?.email || "yghori@asite.com",
    username: user?.username || "yashghori",
    university: user?.university || "Birmingham City University",
    phone: user?.phone || "+91 7048144030",
    city: user?.city || "Ahmedabad",
    country: user?.country || "India",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
        university: user.university || "",
        phone: user.phone || "",
        city: user.city || "",
        country: user.country || "United Kingdom",
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      if (isAuthenticated) {
        await updateProfile({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          university: profileData.university,
          country: profileData.country,
          city: profileData.city,
        });
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top User Cards: Overview + Edit Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Profile Summary Card */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-8 shadow-xs text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full p-1 border-4 border-pink-400 overflow-hidden mx-auto shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-xs text-gray-500">
              {profileData.city}, {profileData.country}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 text-left space-y-3 text-xs text-gray-700">
            <div className="flex items-center gap-3">
              <PersonOutlineIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
              <span>{profileData.username}</span>
            </div>
            <div className="flex items-center gap-3">
              <SchoolOutlinedIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
              <span>{profileData.university}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <EmailOutlinedIcon sx={{ fontSize: 18, color: "#7bbcb0" }} />
              <span>{profileData.email}</span>
            </div>
          </div>
        </div>

        {/* Right Edit Profile Card */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Profile updated successfully!
              </span>
            )}
            {saveError && (
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                {saveError}
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-[#7bbcb0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-[#7bbcb0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-[#7bbcb0]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Change Password"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-[#7bbcb0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  University
                </label>
                <input
                  type="text"
                  value={profileData.university}
                  onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-[#7bbcb0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Country
                </label>
                <select
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 bg-white outline-none focus:border-[#7bbcb0]"
                >
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="USA">USA</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-[#7bbcb0]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#7bbcb0] hover:bg-[#68aba0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-full text-xs shadow-sm transition flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Shortlisted Properties */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">Shortlisted Properties</h3>
            <span className="bg-[#7bbcb0]/20 text-[#5fa89b] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {shortlistedProperties.length}
            </span>
          </div>
          <button
            onClick={() => navigate("/listings")}
            className="text-xs font-semibold text-[#5fa89b] hover:underline"
          >
            Explore more
          </button>
        </div>

        {shortlistedProperties.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-gray-700">No properties in your wishlist yet</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Save accommodations you love by tapping the heart icon on any property card to compare them here anytime.
            </p>
            <button
              onClick={() => navigate("/listings")}
              className="bg-[#7bbcb0] hover:bg-[#68aba0] text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-xs"
            >
              Browse Student Accommodations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {shortlistedProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/property/${p.id}`)}
                className="space-y-1.5 text-center group cursor-pointer relative"
              >
                <div className="h-24 w-full rounded-xl overflow-hidden bg-gray-100 shadow-2xs relative">
                  <img
                    src={p.images?.[0] || "/assets/images/room.jpeg"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.slug || p.id);
                    }}
                    title="Remove from shortlisted"
                    className="absolute top-1 right-1 w-5 h-5 bg-white/90 text-gray-600 hover:text-red-500 rounded-full flex items-center justify-center text-xs shadow-xs"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] font-semibold text-gray-700 truncate">{p.title}</p>
                <p className="text-[10px] font-bold text-[#5fa89b]">
                  {p.currencySymbol || "£"}{p.pricePerWeek}/wk
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest Listed Properties */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block mb-1">
            CHECKOUT OUR NEW
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900">Latest Listed Properties</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTIES.slice(0, 3).map((p) => (
            <PropertyCard key={p.id} property={p} layout="vertical" />
          ))}
        </div>
      </div>
    </div>
  );
}
