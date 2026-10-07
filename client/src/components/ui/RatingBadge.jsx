import React from "react";
import StarIcon from "@mui/icons-material/Star";

export default function RatingBadge({ rating = 4.2, ratingText = "Very Good", reviewsCount = 371, compact = false }) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-[#eaf5f3] text-[#5fa89b] font-semibold text-xs px-2.5 py-1 rounded-full">
        <StarIcon sx={{ fontSize: 15, color: "#ffa902" }} />
        <span>{rating}</span>
        {reviewsCount !== undefined && (
          <span className="text-gray-500 font-normal">({reviewsCount} reviews)</span>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-xs">
      <span className="border border-gray-400 font-bold px-1.5 py-0.5 rounded text-gray-800">
        {rating}
      </span>
      <span className="font-semibold text-gray-800">{ratingText}</span>
      <span className="text-gray-500">{reviewsCount} reviews</span>
    </div>
  );
}
