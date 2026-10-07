import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingInput from "../components/ui/FloatingInput";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("john.doe@gmail.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/profile");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Invalid email or password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Login</h1>
        <p className="text-sm text-gray-500 mt-1">Login to access your BetterAcco account</p>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <FloatingInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@gmail.com"
          required
        />

        <FloatingInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#7bbcb0] focus:ring-[#7bbcb0]"
            />
            <span>Remember me</span>
          </label>
          <a
            href="#forgot-password"
            className="text-[#ff6b6b] hover:text-[#fa5252] font-medium transition"
          >
            Forgot Password
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7bbcb0] hover:bg-[#68aba0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg text-sm shadow-sm transition duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth-handler/register"
          className="text-[#ff6b6b] hover:text-[#fa5252] font-semibold transition"
        >
          Sign up
        </Link>
      </div>

      {/* Or Login With Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-3 text-xs text-gray-400 absolute">Or login with</span>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-3 gap-3">
        {/* Facebook */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/20 transition shadow-2xs"
          title="Login with Facebook"
        >
          <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Google */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50/20 transition shadow-2xs"
          title="Login with Google"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </button>

        {/* Apple */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition shadow-2xs"
          title="Login with Apple"
        >
          <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.34-.56.63-.99 1.68-.86 2.7.99.08 2.01-.5 2.57-1.19z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
