import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import API from "../../services/api";

export default function Footer({ showBanner = true }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [activeInstaPhoto, setActiveInstaPhoto] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await API.post("/meta/newsletter", { email });
    } catch {
      // offline fallback
    } finally {
      setSubscribing(false);
      setSubscribed(true);
      setEmail("");
    }
  };


  const instagramImages = [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=150&q=80",
  ];

  return (
    <footer>
      {/* Optional wave banner for listing properties */}
      {showBanner && (
        <div
          className="relative bg-cover bg-center py-16 px-4 text-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(240, 249, 248, 0.85), rgba(240, 249, 248, 0.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              List your properties efficiently with Better Acco.
            </h2>
            <div>
              <Link
                to="/partner"
                className="inline-block bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold px-8 py-3 rounded-full shadow-md transition duration-200"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="bg-white border-t border-gray-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Stay Connected */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-900">Stay Connected</h4>
              <div className="text-sm text-gray-600 space-y-1.5">
                <p>Address: Istanbul, Turkey</p>
                <p>Phone: (+90) 985 98 75</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Follow us on social media</p>
                <div className="flex items-center space-x-3 text-gray-600">
                  <a href="#facebook" className="hover:text-[#5fa89b] transition" aria-label="Facebook">
                    <FacebookIcon sx={{ fontSize: 20 }} />
                  </a>
                  <a href="#twitter" className="hover:text-[#5fa89b] transition" aria-label="Twitter">
                    <TwitterIcon sx={{ fontSize: 20 }} />
                  </a>
                  <a href="#instagram" className="hover:text-[#5fa89b] transition" aria-label="Instagram">
                    <InstagramIcon sx={{ fontSize: 20 }} />
                  </a>
                  <a href="#linkedin" className="hover:text-[#5fa89b] transition" aria-label="LinkedIn">
                    <LinkedInIcon sx={{ fontSize: 20 }} />
                  </a>
                  <a href="#youtube" className="hover:text-[#5fa89b] transition" aria-label="YouTube">
                    <YouTubeIcon sx={{ fontSize: 20 }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: BetterAcco */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-900">BetterAcco</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <Link to="/about" className="hover:text-[#5fa89b] transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#5fa89b] transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/partner" className="hover:text-[#5fa89b] transition">
                    Collaboration
                  </Link>
                </li>
                <li>
                  <Link to="/listings" className="hover:text-[#5fa89b] transition">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#5fa89b] transition">
                    Policies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: On Instagram */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-900">On Instagram</h4>
              <div className="grid grid-cols-3 gap-2 w-fit">
                {instagramImages.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveInstaPhoto(src)}
                    className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-xs cursor-pointer hover:scale-105 hover:ring-2 hover:ring-[#7bbcb0] transition group relative"
                    title="Click to expand"
                  >
                    <img src={src} alt="Instagram preview" className="w-full h-full object-cover group-hover:opacity-90" />
                  </div>
                ))}
              </div>
            </div>

            {/* Col 4: Newsletter */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-900">Newsletter</h4>
              <p className="text-xs text-gray-500">Get Updated News And Offers!</p>
              {subscribed ? (
                <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 animate-in fade-in duration-200">
                  ✓ Thank you! You are subscribed to our hottest accommodation updates.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-4 py-2 text-xs outline-none focus:border-[#7bbcb0] focus:ring-1 focus:ring-[#7bbcb0]"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="w-full bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold text-xs py-2.5 rounded-full shadow-xs transition duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {subscribing ? "Subscribing..." : "Get The Hottest Offers"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Lightbox Modal */}
      {activeInstaPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveInstaPhoto(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition cursor-pointer"
            >
              ✕
            </button>
            <img src={activeInstaPhoto} alt="Instagram Full Preview" className="w-full h-80 object-cover" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <InstagramIcon sx={{ color: "#e1306c" }} />
                <span className="text-xs font-bold text-gray-800">@betteracco_official</span>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#5fa89b] hover:underline"
              >
                View on Instagram →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Copyright Bar */}
      <div className="bg-gray-900 text-gray-400 text-xs py-4 text-center">
        <p>All Rights Reserved for Better Acco.</p>
      </div>
    </footer>
  );
}

