import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DualRangeSlider from "../components/ui/DualRangeSlider";
import PropertyCard from "../components/common/PropertyCard";
import { PROPERTIES, UNIVERSITIES } from "../data/mockData";

export default function PropertyListings() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State initialized from URL query params
  const [searchTerm, setSearchTerm] = useState(searchParams.get("city") || "");
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState([
    50,
    Number(searchParams.get("maxPrice")) || 3000,
  ]);
  const [minRating, setMinRating] = useState(0);
  const [selectedFreebies, setSelectedFreebies] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedLeaseTypes, setSelectedLeaseTypes] = useState([]);
  const [moveInDate, setMoveInDate] = useState("");
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const freebiesList = [
    "Free breakfast",
    "Free parking",
    "Free internet",
    "Free airport shuttle",
    "Free cancellation",
  ];

  const initialAmenities = ["24hr front desk", "Air-conditioned", "Fitness / Gym", "Swimming Pool"];
  const extraAmenities = [
    "Barbeque",
    "Dryer",
    "Laundry facilities",
    "Microwave",
    "Refrigerator",
    "TV Cable",
    "Washer",
    "Free super-fast Wi-Fi",
    "Study Area",
    "Communal Courtyard",
  ];

  const roomTypesList = ["Ensuite", "Non-Ensuite", "Twin-Ensuite", "Studio", "Twin-Studio"];

  const leaseTypesList = [
    "Summer/Short Stay 8-12 weeks",
    "Semester Stay 12-24 weeks",
    "Stay 24-36 weeks",
    "Full Year Stay 36-44 Weeks",
    "Complete Education Stay 50-52 weeks",
  ];

  const handleCheckboxToggle = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setPriceRange([50, 3000]);
    setMinRating(0);
    setSelectedFreebies([]);
    setSelectedAmenities([]);
    setSelectedRoomTypes([]);
    setSelectedLeaseTypes([]);
    setMoveInDate("");
    setSortBy("recommended");
    setSearchParams({});
  };


  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Search term filter (title, city, country, address)
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          p.title.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.country.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Price filter
      if (p.pricePerWeek < priceRange[0] || p.pricePerWeek > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && (p.rating || 0) < minRating) {
        return false;
      }

      // Room Type
      if (selectedRoomTypes.length > 0 && !selectedRoomTypes.includes(p.roomType)) {
        return false;
      }

      // Lease Type
      if (selectedLeaseTypes.length > 0 && !selectedLeaseTypes.includes(p.leaseType)) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllSelectedAmenities = selectedAmenities.every((amenity) =>
          p.amenities?.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllSelectedAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.pricePerWeek - b.pricePerWeek;
      if (sortBy === "price_desc") return b.pricePerWeek - a.pricePerWeek;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0; // recommended
    });
  }, [searchTerm, priceRange, minRating, selectedRoomTypes, selectedLeaseTypes, selectedAmenities, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-400 flex items-center gap-1.5">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>&gt;</span>
        <Link to="/country/united-kingdom" className="hover:text-gray-700">United Kingdom</Link>
        <span>&gt;</span>
        <span className="text-gray-700 font-medium">Student Accommodation Birmingham</span>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Student Accommodation <span className="font-extrabold">Birmingham</span>
        </h1>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-wrap items-center gap-2.5 shadow-xs">
        {/* Search input */}
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by City, University or Property"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#7bbcb0]"
          />
          <SearchIcon
            sx={{ fontSize: 18 }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Sort dropdown pill */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl pl-3 pr-7 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer transition"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 16 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* University Filter pill */}
        <div className="relative">
          <select
            value={searchTerm.startsWith("University") || searchTerm.includes("Aston") || searchTerm.includes("Birmingham") ? searchTerm : ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl pl-3 pr-7 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer transition"
          >
            <option value="">University: All</option>
            {UNIVERSITIES.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 16 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Move in month pill */}
        <div className="relative">
          <select
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl pl-3 pr-7 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer transition"
          >
            <option value="">Move In: Any</option>
            <option value="Sep 2024">Sep 2024</option>
            <option value="Oct 2024">Oct 2024</option>
            <option value="Jan 2025">Jan 2025</option>
          </select>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 16 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Stay Duration pill */}
        <div className="relative">
          <select
            value={selectedLeaseTypes[0] || ""}
            onChange={(e) => setSelectedLeaseTypes(e.target.value ? [e.target.value] : [])}
            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl pl-3 pr-7 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer transition"
          >
            <option value="">Duration: All</option>
            {leaseTypesList.map((lease) => (
              <option key={lease} value={lease}>
                {lease}
              </option>
            ))}
          </select>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 16 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* More Filters toggle button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
            mobileFilterOpen
              ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
              : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
          }`}
        >
          <FilterListIcon sx={{ fontSize: 16 }} />
          <span>More Filters</span>
        </button>

        {/* Clear All */}
        {(searchTerm || moveInDate || selectedLeaseTypes.length > 0 || selectedFreebies.length > 0 || selectedAmenities.length > 0) && (
          <button
            onClick={handleClearAll}
            className="text-xs font-bold text-[#5fa89b] hover:text-[#46867a] hover:underline px-2 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Main Grid: Sidebar + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button
              onClick={handleClearAll}
              className="text-xs text-[#5fa89b] hover:underline font-semibold"
            >
              Reset
            </button>
          </div>

          {/* 1. Price Slider */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-800">Price</h3>
            <DualRangeSlider
              min={50}
              max={3000}
              value={priceRange}
              onChange={(val) => setPriceRange(val)}
              currencySymbol="£"
            />
          </div>

          {/* 2. Rating */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Rating</h3>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                    minRating === stars
                      ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {stars}+
                </button>
              ))}
            </div>
          </div>

          {/* 3. Freebies */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Freebies</h3>
            <div className="space-y-2">
              {freebiesList.map((item) => (
                <label key={item} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFreebies.includes(item)}
                    onChange={() => handleCheckboxToggle(selectedFreebies, setSelectedFreebies, item)}
                    className="w-4 h-4 rounded border-gray-300 text-[#7bbcb0] focus:ring-[#7bbcb0]"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Amenities */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Amenities</h3>
            <div className="space-y-2">
              {initialAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() =>
                      handleCheckboxToggle(selectedAmenities, setSelectedAmenities, amenity)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#7bbcb0] focus:ring-[#7bbcb0]"
                  />
                  <span>{amenity}</span>
                </label>
              ))}

              {showMoreAmenities &&
                extraAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() =>
                        handleCheckboxToggle(selectedAmenities, setSelectedAmenities, amenity)
                      }
                      className="w-4 h-4 rounded border-gray-300 text-[#7bbcb0] focus:ring-[#7bbcb0]"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}

              <button
                type="button"
                onClick={() => setShowMoreAmenities(!showMoreAmenities)}
                className="text-xs font-bold text-[#5fa89b] hover:underline flex items-center gap-1 pt-1"
              >
                {showMoreAmenities ? (
                  <>
                    Show less <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                  </>
                ) : (
                  <>
                    +24 more <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5. Room Type */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 flex items-center justify-between">
              <span>Room type</span>
              <span className="text-gray-400 text-xs cursor-help" title="Select preferred layout">?</span>
            </h3>
            <div className="space-y-2">
              {roomTypesList.map((type) => (
                <label key={type} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRoomTypes.includes(type)}
                    onChange={() =>
                      handleCheckboxToggle(selectedRoomTypes, setSelectedRoomTypes, type)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#7bbcb0] focus:ring-[#7bbcb0]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. Move In Dates */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Move in dates</h3>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#7bbcb0]"
            />
          </div>

          {/* 7. Lease Type */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Lease type</h3>
            <div className="space-y-2">
              {leaseTypesList.map((lease) => (
                <label key={lease} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLeaseTypes.includes(lease)}
                    onChange={() =>
                      handleCheckboxToggle(selectedLeaseTypes, setSelectedLeaseTypes, lease)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#7bbcb0] focus:ring-[#7bbcb0]"
                  />
                  <span>{lease}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Properties List */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing <span className="font-bold text-gray-900">{filteredProperties.length}</span> of{" "}
              <span className="font-bold text-[#ff6b6b]">257 places</span>
            </span>

            <div className="flex items-center gap-1 font-semibold text-gray-700">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none font-bold text-gray-900 cursor-pointer outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price (Lowest)</option>
                <option value="price_desc">Price (Highest)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
              <p className="text-lg font-bold text-gray-800">No properties match your exact filters</p>
              <p className="text-xs text-gray-500">Try broadening your price range or clearing some amenities.</p>
              <button
                onClick={handleClearAll}
                className="bg-[#7bbcb0] text-white px-6 py-2 rounded-full text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} layout="horizontal" />
              ))}
            </div>
          )}

          {/* Show more results */}
          <div className="pt-4 text-center">
            <button
              onClick={() => alert("All available mock listings loaded!")}
              className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold py-4 rounded-xl text-sm transition duration-200"
            >
              Show more results
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
