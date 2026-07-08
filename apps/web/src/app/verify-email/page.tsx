"use client";

import { useEffect, useState, Suspense} from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

function VerifyEmailInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    api
      .get(`/api/auth/verify-email?token=${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="w-full max-w-md text-center px-6">
        {status === "loading" && (
          <>
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#9fdbda] border-t-transparent" />
            <p className="mt-6 text-[#061b32] font-medium">
              Verifying your email...
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9fdbda]/20">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9fdbda"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-bold text-[#061b32]">
              Email verified!
            </h1>
            <p className="mt-2 text-sm text-[#061b32]/60">
              Your email has been verified. You can now complete your profile.
            </p>
            <Link
              href="/signup?step=2"
              className="mt-8 inline-block bg-[#061b32] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Complete your profile →
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-bold text-[#061b32]">
              Verification failed
            </h1>
            <p className="mt-2 text-sm text-[#061b32]/60">
              The link may have expired. Please request a new verification
              email.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-block bg-[#061b32] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Back to Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailInner />
    </Suspense>
  );
}
