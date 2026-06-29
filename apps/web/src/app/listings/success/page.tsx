"use client";

import Link from "next/link";
import Image from "next/image";

export default function ListingSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9fdbda"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#061b32]">
          Listing Submitted!
        </h1>
        <p className="mt-3 text-sm text-[#061b32]/60 leading-relaxed">
          Your property has been submitted successfully. Our team will review it
          within <span className="font-semibold text-[#061b32]">24 hours</span>{" "}
          and it will go live once verified.
        </p>

        <div className="mt-8 rounded-2xl border border-[#e2e8f0] bg-[#f8fafa] p-5 text-left space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/30 mt-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#061b32"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm text-[#061b32]/70">
              Photos and ownership proof uploaded
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/30 mt-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#061b32"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm text-[#061b32]/70">
              Listing sent for verification
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/20 mt-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9fdbda"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="text-sm text-[#061b32]/70">
              You'll be notified once your listing goes live
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/listings/create"
            className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity text-center"
          >
            List Another Property
          </Link>
          <Link
            href="/"
            className="w-full rounded-xl border border-[#e2e8f0] py-3 text-sm font-medium text-[#061b32] hover:border-[#9fdbda] transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
