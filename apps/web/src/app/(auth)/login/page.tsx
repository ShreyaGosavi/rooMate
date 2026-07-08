"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { setTokens } from "@/lib/auth";

function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setTokens(res.data.accessToken, res.data.refreshToken);
      window.location.href = "/";
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white pl-11 pr-4 py-3 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none transition-colors border-[#e2e8f0] focus:border-[#9fdbda]";

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col p-12 relative overflow-hidden min-h-screen bg-white">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="RooMate"
            width={130}
            height={34}
            priority
          />
        </Link>
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-[#061b32] leading-snug">
            Welcome back. <span className="text-[#9fdbda]">We've been expecting you.</span>
          </h2>
          <p className="mt-4 text-[#061b32]/50 text-sm leading-relaxed max-w-sm">
            Sign in to pick up where you left off.
          </p>
        </div>
        <div className="flex-1 flex items-end pb-8">
          <Image
            src="/login.svg"
            alt="Login"
            width={520}
            height={400}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#9fdbda]/30">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#061b32"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p className="text-xs text-[#061b32]/40">Safe · Secure · Verified</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {registered && (
            <div className="mb-6 rounded-xl border border-[#9fdbda] bg-[#9fdbda]/10 px-4 py-3 text-sm text-[#061b32]">
              Account created successfully! Please log in.
            </div>
          )}

          <h1 className="text-2xl font-bold text-[#061b32]">
            Let's get you back in.
          </h1>
          <p className="mt-1 text-sm text-[#061b32]/50">
            Sign in to pick up where you left off.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[#061b32]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#9fdbda] hover:opacity-80">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={`${inputBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30 hover:text-[#061b32] transition-colors"
                >
                  {showPassword ? (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-[#061b32]/50">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#9fdbda] hover:opacity-80 transition-opacity"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
