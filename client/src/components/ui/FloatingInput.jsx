import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative ${className}`}>
      <div className="relative border border-gray-300 focus-within:border-[#7bbcb0] focus-within:ring-1 focus-within:ring-[#7bbcb0] rounded-lg px-3.5 pt-3 pb-2.5 transition-colors bg-white">
        <label
          htmlFor={name}
          className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-600 pointer-events-none"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type={actualType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-gray-900 outline-none focus:outline-none placeholder-gray-400"
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 ml-2 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
              ) : (
                <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
              )}
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1 pl-1">{error}</p>}
    </div>
  );
}
