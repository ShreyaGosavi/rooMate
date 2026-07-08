"use client";

import { useState, useEffect, useRef, Suspense} from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

type Step = 1 | 2;

function SignupInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (searchParams.get("step") === "2" && emailParam) {
      setStep(2);
      setEmail(decodeURIComponent(emailParam));
      setSent(true);
      setVerified(true);
    }
  }, [searchParams]);

  const startPolling = (emailToCheck: string) => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const res = await api.get(
          `/api/auth/verification-status?email=${encodeURIComponent(emailToCheck)}`,
        );
        if (res.data.verified) {
          setVerified(true);
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        /* silent */
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleSendVerification = async () => {
    if (!email) return;
    setLoading(true);
    setGeneralError("");
    try {
      await api.post("/api/auth/send-verification", { email });
      setSent(true);
      startPolling(email);
    } catch (e: any) {
      const msg = e?.response?.data?.message;
      setGeneralError(Array.isArray(msg) ? msg[0] : (msg ?? "Failed to send verification email. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    const errors: Record<string, string> = {};
    if (!username || username.length < 3)
      errors.username = "Username must be at least 3 characters.";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10)
      errors.phone = "Enter a valid 10-digit phone number.";
    if (!gender) errors.gender = "Please select your gender.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setGeneralError("");
    setLoading(true);

    try {
      await api.post("/api/auth/signup", {
        email,
        username,
        password,
        phone: phoneDigits,
        gender,
      });
    } catch (e: any) {
      const msg = e?.response?.data?.message;
      const errText = Array.isArray(msg) ? msg[0] : (msg ?? "Signup failed. Please try again.");
      if (errText.toLowerCase().includes("username") || errText.toLowerCase().includes("taken")) {
        setFieldErrors(p => ({ ...p, username: "This username is already taken." }));
      } else if (errText.toLowerCase().includes("email")) {
        setGeneralError("This email is already registered. Please log in.");
      } else {
        setGeneralError(errText);
      }
      setLoading(false);
      return;
    }

    try {
      const loginRes = await api.post("/api/auth/login", { email, password });
      const { accessToken, refreshToken } = loginRes.data;
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    } catch {
      // auto-login failed silently, user will be redirected
    } finally {
      setLoading(false);
    }
    window.location.href = "/";
  };

  const inputBase =
    "w-full rounded-xl border bg-white pl-11 pr-4 py-3 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none transition-colors";
  const inputNormal = "border-[#e2e8f0] focus:border-[#9fdbda]";
  const inputError = "border-red-300 focus:border-red-400";

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
            Your next move <span className="text-[#9fdbda]">starts here.</span>
          </h2>
          <p className="mt-4 text-[#061b32]/50 text-sm leading-relaxed max-w-sm">
            We can't help you pack your bags, but we can help you find the right place.
          </p>
        </div>
        <div className="flex-1 flex items-end pb-8">
          <Image
            src="/signup.svg"
            alt="Roommates"
            width={530}
            height={410}
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
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Stepper */}
          <div className="mb-10 flex items-center gap-0">
            {[
              { n: 1, label: "Verify Email" },
              { n: 2, label: "Your Details" },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      step === s.n
                        ? "bg-[#061b32] text-white shadow-md scale-110"
                        : step > s.n
                          ? "bg-[#9fdbda] text-[#061b32]"
                          : "bg-[#f0f7f7] text-[#061b32]/30 border border-[#e2e8f0]"
                    }`}
                  >
                    {step > s.n ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      s.n
                    )}
                  </div>
                  <span
                    className={`mt-1.5 text-xs font-medium ${step === s.n ? "text-[#061b32]" : "text-[#061b32]/30"}`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 1 && (
                  <div className="flex-1 mx-3 mb-4">
                    <div className="h-[2px] w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-[#9fdbda] transition-all duration-500 ${step === 2 ? "w-full" : "w-0"}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-[#061b32]">
                Create your account
              </h1>
              <p className="mt-1 text-sm text-[#061b32]/50">
                {sent
                  ? "Check your inbox and click the verification link."
                  : "Let's start by verifying your email address."}
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
                      disabled={sent}
                      className={`${inputBase} ${inputNormal} disabled:bg-[#f8fafa] disabled:opacity-70`}
                    />
                  </div>
                </div>
                {generalError && (
                  <p className="text-xs text-red-500">{generalError}</p>
                )}
                {!sent ? (
                  <button
                    onClick={handleSendVerification}
                    disabled={loading || !email}
                    className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Verification Email"}
                  </button>
                ) : (
                  <>
                    <div
                      className={`rounded-xl border p-4 text-sm ${verified ? "border-[#9fdbda] bg-[#9fdbda]/10" : "border-[#e2e8f0] bg-[#f8fafa]"}`}
                    >
                      {verified ? (
                        <span className="flex items-center gap-2 font-medium text-green-700">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Email verified! You can continue now.
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-[#061b32]/60">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9fdbda"
                            strokeWidth="2"
                            className="animate-spin"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          Waiting for you to click the link in your email...
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!verified}
                      className="w-full rounded-xl bg-[#9fdbda] py-3 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#061b32]">
                Tell us about yourself
              </h1>
              <p className="mt-1 text-sm text-[#061b32]/50">
                Just a few more details and you're all set.
              </p>
              <div className="mt-8 space-y-4">
                {/* Email - disabled */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#061b32]/20">
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
                      disabled
                      className={`${inputBase} border-[#e2e8f0] bg-[#f8fafa] text-[#061b32]/40 cursor-not-allowed`}
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Username
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setFieldErrors((p) => ({ ...p, username: "" }));
                      }}
                      placeholder="shreya_g"
                      className={`${inputBase} ${fieldErrors.username ? inputError : inputNormal}`}
                    />
                  </div>
                  {fieldErrors.username && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.username}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Password
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
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((p) => ({ ...p, password: "" }));
                      }}
                      placeholder="Min. 8 characters"
                      className={`${inputBase} pr-12 ${fieldErrors.password ? inputError : inputNormal}`}
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
                  {fieldErrors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Phone number
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
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        );
                        setFieldErrors((p) => ({ ...p, phone: "" }));
                      }}
                      placeholder="10-digit mobile number"
                      className={`${inputBase} ${fieldErrors.phone ? inputError : inputNormal}`}
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    I am
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        {
                          value: "MALE",
                          label: "Male",
                          icon: (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="7" r="4" />
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            </svg>
                          ),
                        },
                        {
                          value: "FEMALE",
                          label: "Female",
                          icon: (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="8" r="4" />
                              <path d="M12 12v9" />
                              <path d="M9 18h6" />
                            </svg>
                          ),
                        },
                      ] as const
                    ).map((g) => (
                      <button
                        key={g.value}
                        onClick={() => {
                          setGender(g.value);
                          setFieldErrors((p) => ({ ...p, gender: "" }));
                        }}
                        className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all border ${
                          gender === g.value
                            ? "bg-[#061b32] text-white border-[#061b32] shadow-md"
                            : "bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]"
                        }`}
                      >
                        {g.icon}
                        {g.label}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.gender && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.gender}
                    </p>
                  )}
                </div>

                {generalError && (
                  <p className="text-xs text-red-500">{generalError}</p>
                )}
                <button
                  onClick={handleCompleteSignup}
                  disabled={loading}
                  className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm text-[#061b32]/50">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#9fdbda] hover:opacity-80 transition-opacity"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupInner />
    </Suspense>
  );
}
