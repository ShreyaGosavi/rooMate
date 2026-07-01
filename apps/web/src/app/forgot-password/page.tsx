"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/forgot-password", { email });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden lg:flex lg:w-1/2 flex-col p-12 bg-white">
        <Link href="/">
          <Image src="/logo.svg" alt="RooMate" width={130} height={34} priority />
        </Link>
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-[#061b32] leading-snug">
            Happens to <span className="text-[#9fdbda]">everyone.</span>
          </h2>
          <p className="mt-4 text-[#061b32]/50 text-sm leading-relaxed max-w-sm">
            We'll send you a link to reset your password. You'll be back in no time.
          </p>
        </div>
        <div className="flex-1 flex items-end pb-8">
          <Image src="/login.svg" alt="Forgot password" width={520} height={400} className="w-full" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {sent ? (
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9fdbda]/20 mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h1 className="text-2xl font-bold text-[#061b32]">Check your inbox</h1>
              <p className="mt-2 text-sm text-[#061b32]/50">We've sent a password reset link to <span className="font-medium text-[#061b32]">{email}</span>. It expires in 15 minutes.</p>
              <Link href="/login" className="mt-6 inline-block text-sm font-medium text-[#9fdbda] hover:opacity-80">← Back to login</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#061b32]">Forgot your password?</h1>
              <p className="mt-1 text-sm text-[#061b32]/50">Enter your email and we'll send you a reset link.</p>
              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">Email address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white pl-11 pr-4 py-3 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none focus:border-[#9fdbda]" />
                  </div>
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button onClick={handleSubmit} disabled={loading || !email} className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
              <p className="mt-6 text-center text-sm text-[#061b32]/50">
                Remember it? <Link href="/login" className="font-medium text-[#9fdbda] hover:opacity-80">Log in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
