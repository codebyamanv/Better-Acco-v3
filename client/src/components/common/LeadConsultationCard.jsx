import React, { useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import { submitLeadConsultation } from "../../services/api";

export default function LeadConsultationCard({ className = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "UK +44",
    phone: "",
    university: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    try {
      await submitLeadConsultation(formData);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 max-w-md w-full ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#5fa89b] flex items-center justify-center">
          <BoltIcon sx={{ fontSize: 16 }} />
        </span>
        <h3 className="font-bold text-gray-900 text-lg">
          Let us assist you <span className="italic font-serif text-[#5fa89b]">for free!</span>
        </h3>
      </div>
      <p className="text-xs text-gray-500 mb-6">Save at least 7 hours with our experts help</p>

      {submitted ? (
        <div className="bg-[#eaf5f3] text-[#5fa89b] p-5 rounded-xl text-center space-y-2">
          <div className="w-10 h-10 bg-[#7bbcb0] text-white rounded-full mx-auto flex items-center justify-center font-bold">
            ✓
          </div>
          <h4 className="font-bold text-gray-900">Request Received!</h4>
          <p className="text-xs text-gray-600">
            One of our senior accommodation specialists will contact you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-[#7bbcb0] focus:ring-1 focus:ring-[#7bbcb0]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="johnsmith@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-[#7bbcb0] focus:ring-1 focus:ring-[#7bbcb0]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
              Phone Number
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="col-span-1 border border-gray-300 rounded-lg px-2 py-2 text-xs bg-white outline-none focus:border-[#7bbcb0]"
              >
                <option value="UK +44">UK +44</option>
                <option value="US +1">US +1</option>
                <option value="IN +91">IN +91</option>
                <option value="EU +49">EU +49</option>
                <option value="AU +61">AU +61</option>
              </select>
              <input
                type="tel"
                placeholder="12345 67890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="col-span-2 border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-[#7bbcb0] focus:ring-1 focus:ring-[#7bbcb0]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
              University
            </label>
            <input
              type="text"
              placeholder="Oxford University"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-[#7bbcb0] focus:ring-1 focus:ring-[#7bbcb0]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold py-3 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <BoltIcon sx={{ fontSize: 18 }} />
            <span>{loading ? "Submitting..." : "Get Expert Help!"}</span>
          </button>

          <p className="text-[11px] text-gray-400 text-center">
            By submitting you agree to our{" "}
            <a href="/about" className="text-[#5fa89b] underline">
              terms
            </a>{" "}
            and{" "}
            <a href="/about" className="text-[#5fa89b] underline">
              privacy policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
