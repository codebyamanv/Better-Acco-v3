import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import PropertyCard from "../components/common/PropertyCard";
import { PROPERTIES } from "../data/mockData";

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState(["compass-birmingham", "tranquil-haven-woods"]);
  const [addPropertyModal, setAddPropertyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const comparedProperties = selectedIds
    .map((id) => PROPERTIES.find((p) => p.id === id))
    .filter(Boolean);

  const amenityKeys = [
    "Air Conditioning",
    "Barbeque",
    "Dryer",
    "Gym",
    "Laundry",
    "Lawn",
    "Microwave",
    "Outdoor Shower",
    "Refrigerator",
    "Sauna",
    "Swimming Pool",
    "TV Cable",
    "Washer",
    "WiFi",
    "Window Coverings",
  ];

  const handleRemove = (id) => {
    if (selectedIds.length <= 1) {
      alert("Please keep at least one property in the comparison table.");
      return;
    }
    setSelectedIds(selectedIds.filter((x) => x !== id));
  };

  const handleAdd = (id) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 4) {
      alert("You can compare up to 4 properties simultaneously.");
      return;
    }
    setSelectedIds([...selectedIds, id]);
    setAddPropertyModal(false);
    setSearchTerm("");
  };

  const availableProperties = PROPERTIES.filter(
    (p) =>
      !selectedIds.includes(p.id) &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#5fa89b] uppercase tracking-wider block">
            Side-by-Side Evaluation
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Compare Properties
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg">
            Compare student accommodations, facilities, distances, and pricing to find the perfect home for your academic year.
          </p>
        </div>

        {comparedProperties.length < 4 && (
          <button
            onClick={() => setAddPropertyModal(true)}
            className="self-start sm:self-auto flex items-center gap-2 bg-[#7bbcb0] hover:bg-[#68a79b] text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
            <span>Add Property ({comparedProperties.length}/4)</span>
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            {/* Header Images Row */}
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-4 w-48 bg-gray-50/60 font-bold text-gray-400 uppercase tracking-wider text-[11px]">
                  Property Details
                </th>
                {comparedProperties.map((p) => (
                  <th key={p.id} className="p-4 w-72 align-top">
                    <div className="space-y-3 relative group">
                      <button
                        onClick={() => handleRemove(p.id)}
                        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center shadow-xs transition"
                        title="Remove from comparison"
                      >
                        ✕
                      </button>
                      <div className="h-44 rounded-2xl overflow-hidden bg-gray-100 relative">
                        <img
                          src={p.images?.[0] || "/assets/images/room.jpeg"}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 text-sm truncate" title={p.title}>
                          {p.title}
                        </h3>
                        <p className="text-[#5fa89b] font-extrabold text-sm">
                          {p.currencySymbol || "£"}{p.pricePerWeek?.toLocaleString()}/week
                        </p>
                        <p className="text-[11px] text-gray-400">{p.city}, {p.country}</p>
                      </div>
                      <Link
                        to={`/property/${p.id}`}
                        className="block text-center w-full bg-gray-100 hover:bg-[#7bbcb0] hover:text-white font-bold py-2 rounded-xl text-xs text-gray-700 transition"
                      >
                        View Full Details
                      </Link>
                    </div>
                  </th>
                ))}
                {comparedProperties.length < 4 && (
                  <th className="p-4 w-48 align-middle text-center">
                    <button
                      onClick={() => setAddPropertyModal(true)}
                      className="inline-flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 hover:border-[#7bbcb0] rounded-2xl text-gray-400 hover:text-[#5fa89b] transition w-full h-44 cursor-pointer"
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: 36 }} />
                      <span className="text-xs font-bold mt-2">Add Property</span>
                      <span className="text-[10px] text-gray-400">Up to 4</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            {/* Spec Rows */}
            <tbody className="divide-y divide-gray-100">
              {/* Category: Overview */}
              <tr className="bg-gray-50/80">
                <td colSpan={comparedProperties.length + 1} className="p-3 font-bold text-gray-800 text-xs tracking-wider uppercase">
                  Overview & Location
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Address</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600">
                    {p.address}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">City & Country</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600">
                    {p.city}, {p.country}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Distance to Campus</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600 font-medium">
                    {p.distanceFromCenter || "0.4 mi (8 min walk)"}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Property Type</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600">
                    {p.propertyType || "Student Residence"}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              {/* Category: Pricing & Lease */}
              <tr className="bg-gray-50/80">
                <td colSpan={comparedProperties.length + 1} className="p-3 font-bold text-gray-800 text-xs tracking-wider uppercase">
                  Pricing & Leasing
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Weekly Rent</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-gray-900">
                    {p.currencySymbol || "£"}{p.pricePerWeek}/week
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Holding Deposit</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600">
                    {p.deposit || "£100 - £250 (credited to 1st installment)"}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Bills Included</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                    <span>All Bills Included (Water, Gas, Electricity, WiFi)</span>
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              {/* Category: Room Specifications */}
              <tr className="bg-gray-50/80">
                <td colSpan={comparedProperties.length + 1} className="p-3 font-bold text-gray-800 text-xs tracking-wider uppercase">
                  Room Specifications
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Bedrooms</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-800 font-semibold">
                    {p.beds || 1}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Bathrooms</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-800 font-semibold">
                    {p.baths || 1} (Ensuite)
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Square Footage / Size</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600">
                    {p.squareFeet || "19 - 26 sq m"}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Garage / Parking</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-gray-600">
                    {p.garage || (p.amenities?.some((a) => a.toLowerCase().includes("parking")) ? "Available" : "On-street / Bike Storage")}
                  </td>
                ))}
                {comparedProperties.length < 4 && <td />}
              </tr>

              {/* Category: Amenities Checklist */}
              <tr className="bg-gray-50/80">
                <td colSpan={comparedProperties.length + 1} className="p-3 font-bold text-gray-800 text-xs tracking-wider uppercase">
                  Facilities & Amenities Checklist
                </td>
              </tr>

              {amenityKeys.map((amenity) => (
                <tr key={amenity} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/40">{amenity}</td>
                  {comparedProperties.map((p) => {
                    const hasAmenity = p.amenities?.some((a) =>
                      a.toLowerCase().includes(amenity.toLowerCase())
                    );
                    return (
                      <td key={p.id} className="p-4">
                        {hasAmenity ? (
                          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                            <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                            <span>Included</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-gray-400">
                            <RemoveIcon sx={{ fontSize: 18 }} />
                            <span>No</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                  {comparedProperties.length < 4 && <td />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Listed Properties carousel */}
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

      {/* Add Property Modal with Search */}
      {addPropertyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Add Property to Compare</h3>
                <p className="text-xs text-gray-500">Select any student residence to analyze</p>
              </div>
              <button
                onClick={() => {
                  setAddPropertyModal(false);
                  setSearchTerm("");
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" sx={{ fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search by property title, city, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#7bbcb0]"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {availableProperties.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-8">
                  No matching properties found.
                </p>
              ) : (
                availableProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleAdd(p.id)}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-[#7bbcb0] hover:bg-[#eaf5f3]/40 cursor-pointer transition group"
                  >
                    <img
                      src={p.images?.[0] || "/assets/images/room.jpeg"}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-gray-900 truncate">{p.title}</h4>
                      <p className="text-[11px] text-gray-500">{p.city}, {p.country}</p>
                      <p className="text-xs font-bold text-[#5fa89b]">
                        {p.currencySymbol || "£"}{p.pricePerWeek}/week
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#5fa89b] bg-[#eaf5f3] px-3 py-1.5 rounded-lg group-hover:bg-[#7bbcb0] group-hover:text-white transition">
                      + Select
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

