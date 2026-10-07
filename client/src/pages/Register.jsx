import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingInput from "../components/ui/FloatingInput";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        role: formData.role,
      });
      navigate("/profile");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
        <p className="text-sm text-gray-500 mt-1">Register to join the BetterAcco community</p>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <FloatingInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="John Smith"
          required
        />

        <FloatingInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john.smith@gmail.com"
          required
        />

        <FloatingInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+44 7911 123456"
        />

        <FloatingInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        {/* Role toggle */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-700 pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={() => setFormData({ ...formData, role: "student" })}
              className="text-[#7bbcb0] focus:ring-[#7bbcb0]"
            />
            <span>I am a Student</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="partner"
              checked={formData.role === "partner"}
              onChange={() => setFormData({ ...formData, role: "partner" })}
              className="text-[#7bbcb0] focus:ring-[#7bbcb0]"
            />
            <span>I am a Property Partner</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7bbcb0] hover:bg-[#68aba0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg text-sm shadow-sm transition duration-200 mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Creating Account...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-600">
        Already have an account?{" "}
        <Link
          to="/auth-handler/login"
          className="text-[#ff6b6b] hover:text-[#fa5252] font-semibold transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
