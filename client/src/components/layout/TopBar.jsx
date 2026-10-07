import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function TopBar() {
  return (
    <div className="bg-[#5fa89b] text-white text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-1.5 font-medium">
          <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
          <span>BetterAcco Your Perfect Accomodation Partner</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:+12062142298"
            className="flex items-center gap-1.5 hover:text-white/80 transition"
          >
            <PhoneOutlinedIcon sx={{ fontSize: 15 }} />
            <span>+1 206-214-2298</span>
          </a>
          <a
            href="mailto:betteracco@gmail.com"
            className="flex items-center gap-1.5 hover:text-white/80 transition"
          >
            <EmailOutlinedIcon sx={{ fontSize: 15 }} />
            <span>betteracco@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
