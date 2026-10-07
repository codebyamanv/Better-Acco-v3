import React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function Badge({ type = "Popular", text, className = "" }) {
  const badgeConfig = {
    Popular: {
      bg: "bg-red-500",
      textColor: "text-white",
      icon: <WhatshotIcon sx={{ fontSize: 16 }} />,
      label: text || "Popular",
    },
    "New Listing": {
      bg: "bg-sky-500",
      textColor: "text-white",
      icon: <HomeWorkIcon sx={{ fontSize: 16 }} />,
      label: text || "New Listing",
    },
    "Discounted Price": {
      bg: "bg-emerald-500",
      textColor: "text-white",
      icon: <LocalOfferIcon sx={{ fontSize: 16 }} />,
      label: text || "Discounted Price",
    },
  };

  const current = badgeConfig[type] || {
    bg: "bg-[#7bbcb0]",
    textColor: "text-white",
    icon: null,
    label: text || type,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${current.bg} ${current.textColor} ${className}`}
    >
      {current.icon}
      <span>{current.label}</span>
    </span>
  );
}
