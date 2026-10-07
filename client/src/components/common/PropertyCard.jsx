import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import Badge from "../ui/Badge";
import RatingBadge from "../ui/RatingBadge";
import { useWishlist } from "../../context/WishlistContext";

export default function PropertyCard({
  property,
  layout = "horizontal", // "horizontal" for listings, "vertical" for grids/carousels
  onToggleWishlist,
  isWishlisted,
}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const { isWishlisted: checkWishlist, toggleWishlist: contextToggle } = useWishlist();
  const navigate = useNavigate();

  const propKey = property.slug || property.id;
  const isFavorited = isWishlisted !== undefined ? isWishlisted : checkWishlist(propKey);

  const images = property.images && property.images.length > 0
    ? property.images
    : ["/assets/images/room.jpeg"];

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onToggleWishlist) {
      onToggleWishlist(property.id, !isFavorited);
    } else {
      contextToggle(propKey);
    }
  };

  const handleDotClick = (e, idx) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImgIdx(idx);
  };

  if (layout === "vertical") {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col group">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <img
            src={images[currentImgIdx]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          {property.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge type={property.badge} />
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition"
            aria-label="Save to wishlist"
          >
            {isFavorited ? (
              <FavoriteIcon sx={{ fontSize: 20, color: "#ef4444" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            )}
          </button>

          {/* Video Icon */}
          <div className="absolute bottom-3 left-3 z-10 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center">
            <VideocamOutlinedIcon sx={{ fontSize: 16 }} />
          </div>

          {/* Carousel Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => handleDotClick(e, i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImgIdx === i ? "bg-white w-4" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">
              Starting From:{" "}
              <span className="text-xl font-bold text-gray-900">
                {property.currencySymbol || "$"} {property.pricePerWeek?.toLocaleString()}/week
              </span>
            </div>
            <Link to={`/property/${property.id}`}>
              <h3 className="text-lg font-bold text-gray-900 hover:text-[#7bbcb0] transition line-clamp-1">
                {property.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <LocationOnOutlinedIcon sx={{ fontSize: 15, color: "#7bbcb0" }} />
              <span className="truncate">{property.address}</span>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-600 font-medium">
            <span className="flex items-center gap-1">
              <HotelOutlinedIcon sx={{ fontSize: 16 }} />
              1 Room Available
            </span>
            {property.beds && (
              <span className="flex items-center gap-1">
                <BedOutlinedIcon sx={{ fontSize: 16 }} />
                {property.beds} Beds
              </span>
            )}
            {property.baths && (
              <span className="flex items-center gap-1">
                <BathtubOutlinedIcon sx={{ fontSize: 16 }} />
                {property.baths} Bath
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Horizontal Layout (for /listings)
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-300 grid grid-cols-1 md:grid-cols-12 gap-0 group">
      {/* Left Image Carousel */}
      <div className="relative md:col-span-5 h-64 md:h-full min-h-[240px] overflow-hidden bg-gray-100">
        <img
          src={images[currentImgIdx]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {property.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge type={property.badge} />
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition"
          aria-label="Save to wishlist"
        >
          {isFavorited ? (
            <FavoriteIcon sx={{ fontSize: 20, color: "#ef4444" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 20 }} />
          )}
        </button>

        {/* Video Tour Icon */}
        <div className="absolute bottom-3 left-3 z-10 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center">
          <VideocamOutlinedIcon sx={{ fontSize: 16 }} />
        </div>

        {/* Carousel Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => handleDotClick(e, i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImgIdx === i ? "bg-white w-4" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Details */}
      <div className="md:col-span-7 p-6 flex flex-col justify-between">
        <div>
          <Link to={`/property/${property.id}`}>
            <h3 className="text-xl font-bold text-gray-900 hover:text-[#7bbcb0] transition">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-start gap-1.5 text-xs text-gray-500 mt-2">
            <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#7bbcb0", marginTop: "1px" }} />
            <span>{property.address}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600 mt-3">
            <span className="text-[#5fa89b]">★★★★★ 5 Star Hotel</span>
            <span>☕ 20+ Amenities</span>
          </div>

          <div className="mt-3">
            <RatingBadge
              rating={property.rating || 4.2}
              ratingText={property.ratingText || "Very Good"}
              reviewsCount={property.reviewsCount || 371}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 mt-4 flex items-end justify-between">
          <div>
            <span className="text-xs text-gray-500 block">starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#5fa89b]">
                {property.currencySymbol || "₹"} {property.pricePerWeek?.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-gray-700">/week</span>
            </div>
            <span className="text-[11px] text-gray-400">excl. tax</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlistClick}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-300 transition"
              title="Add to Wishlist"
            >
              {isFavorited ? (
                <FavoriteIcon sx={{ fontSize: 20, color: "#ef4444" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              )}
            </button>
            <button
              onClick={() => navigate(`/property/${property.id}`)}
              className="bg-[#7bbcb0] hover:bg-[#68aba0] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition shadow-sm"
            >
              View Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
