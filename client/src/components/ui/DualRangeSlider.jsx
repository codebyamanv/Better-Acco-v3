import React from "react";

export default function DualRangeSlider({
  min = 500,
  max = 20000,
  value = [500, 20000],
  onChange,
  currencySymbol = "₹",
  step = 100,
}) {
  const [minVal, maxVal] = Array.isArray(value) ? value : [min, value || max];

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    if (onChange) onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    if (onChange) onChange([minVal, newMax]);
  };

  const minPercent = Math.round(((minVal - min) / (max - min)) * 100);
  const maxPercent = Math.round(((maxVal - min) / (max - min)) * 100);

  return (
    <div className="w-full space-y-3">
      <div className="relative w-full h-2 my-4">
        {/* Track background */}
        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-gray-200" />
        {/* Active track */}
        <div
          className="absolute top-0 bottom-0 rounded-full bg-[#7bbcb0]"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {/* Range inputs */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full h-2 pointer-events-none appearance-none bg-transparent accent-[#7bbcb0] z-20"
          style={{ WebkitAppearance: "none" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-2 pointer-events-none appearance-none bg-transparent accent-[#7bbcb0] z-30"
          style={{ WebkitAppearance: "none" }}
        />
      </div>

      <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
        <span>
          {currencySymbol} {minVal.toLocaleString()}
        </span>
        <span>
          {currencySymbol} {maxVal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
