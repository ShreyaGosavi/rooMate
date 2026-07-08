"use client";
import { useState, useEffect, Suspense} from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset token.");
  }, [token]);

  const handleSubmit = async () => {
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/reset-password", { token, password });
      setDone(true);
    } catch (e: any) {
      const msg = e?.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : (msg ?? "Invalid or expired link. Please request a new one."));
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
            New password, <span className="text-[#9fdbda]">fresh start.</span>
          </h2>
          <p className="mt-4 text-[#061b32]/50 text-sm leading-relaxed max-w-sm">
            Choose something strong and memorable. You've got this.
          </p>
        </div>
        <div className="flex-1 flex items-end pb-8">
          <Image src="/login.svg" alt="Reset password" width={520} height={400} className="w-full" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {done ? (
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9fdbda]/20 mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h1 className="text-2xl font-bold text-[#061b32]">Password reset!</h1>
              <p className="mt-2 text-sm text-[#061b32]/50">Your password has been updated. You can now log in with your new password.</p>
              <Link href="/login" className="mt-6 inline-block rounded-xl bg-[#061b32] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">Go to Login</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#061b32]">Set new password</h1>
              <p className="mt-1 text-sm text-[#061b32]/50">Must be at least 8 characters.</p>
              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">New password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white pl-11 pr-12 py-3 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none focus:border-[#9fdbda]" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30 hover:text-[#061b32]">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">Confirm password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/30">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type={showPassword ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      placeholder="Repeat password"
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white pl-11 pr-4 py-3 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none focus:border-[#9fdbda]" />
                  </div>
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button onClick={handleSubmit} disabled={loading || !password || !confirm || !token} className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}
