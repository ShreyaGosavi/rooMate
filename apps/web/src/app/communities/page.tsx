"use client";
import Navbar from "@/components/layout/navbar";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";

const TYPE_LABELS: Record<string, string> = {
  COLLEGE: "College",
  COMPANY: "Company",
};

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [myCommunities, setMyCommunities] = useState<string[]>([]);
  const [joiningId, setJoiningId] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Request form
  const [reqName, setReqName] = useState("");
  const [reqType, setReqType] = useState("COLLEGE");
  const [reqCity, setReqCity] = useState("");
  const [reqWebsite, setReqWebsite] = useState("");
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    fetchCommunities("");
    if (isLoggedIn()) fetchMyCommunities();
  }, []);

  const fetchCommunities = async (q: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/communities?query=${q}`);
      setCommunities(res.data.communities || res.data || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const fetchMyCommunities = async () => {
    try {
      const res = await api.get("/api/communities/my");
      const myData = res.data.communities || res.data || [];
      setMyCommunities(
        myData.map((c: any) => c.communityId || c.community?.id || c.id),
      );
    } catch {}
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    const t = setTimeout(() => fetchCommunities(val), 400);
    return () => clearTimeout(t);
  };

  const joinCommunity = async (id: string) => {
    if (!loggedIn) {
      window.location.href = "/login";
      return;
    }
    setJoiningId(id);
    try {
      await api.post(`/api/communities/${id}/join`);
      setMyCommunities((prev) => [...prev, id]);
    } catch {
    } finally {
      setJoiningId("");
    }
  };

  const leaveCommunity = async (id: string) => {
    setJoiningId(id);
    try {
      await api.delete(`/api/communities/${id}/leave`);
      setMyCommunities((prev) => prev.filter((c) => c !== id));
    } catch {
    } finally {
      setJoiningId("");
    }
  };

  const submitRequest = async () => {
    if (!reqName || !reqCity) return;
    setReqSubmitting(true);
    try {
      await api.post("/api/communities/request", {
        communityName: reqName,
        type: reqType,
        city: reqCity,
        officialWebsite: reqWebsite,
      });
      setReqSuccess(true);
      setReqName("");
      setReqCity("");
      setReqWebsite("");
      setTimeout(() => {
        setReqSuccess(false);
        setShowRequest(false);
      }, 3000);
    } catch {
    } finally {
      setReqSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      <Navbar />

      <div className="px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#061b32]">Communities</h1>
            <p className="mt-1 text-sm text-[#061b32]/50">
              Join your college or company community to connect with people near
              you.
            </p>
          </div>
          <button
            onClick={() => setShowRequest(true)}
            className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-medium text-[#061b32] hover:border-[#9fdbda] transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Request Community
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 mb-6 max-w-lg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#061b32"
            strokeWidth="2"
            className="text-[#061b32]/30"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by college or company name..."
            className="text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none bg-transparent w-full"
          />
        </div>

        {/* Communities grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-5 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-[#f0f7f7]" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-32 rounded bg-[#f0f7f7]" />
                    <div className="h-3 w-20 rounded bg-[#f0f7f7]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : communities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9fdbda"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="font-semibold text-[#061b32]">No communities found</p>
            <p className="text-sm text-[#061b32]/40 mt-1">
              Try a different search or request your community
            </p>
            <button
              onClick={() => setShowRequest(true)}
              className="mt-4 rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Request Community
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((c) => {
              const isMember = myCommunities.includes(c.id);
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9fdbda]/20 text-base font-bold text-[#061b32]">
                      {c.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#061b32] text-sm truncate">
                        {c.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="rounded-full bg-[#f0f7f7] px-2 py-0.5 text-xs text-[#061b32]/50">
                          {TYPE_LABELS[c.type] || c.type}
                        </span>
                        <span className="text-xs text-[#061b32]/40">
                          {c.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#061b32]/40 mb-4">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    {c._count?.members || c.memberCount || 0} members
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/communities/${c.id}`}
                      className="flex-1 rounded-xl border border-[#e2e8f0] py-2 text-xs font-medium text-[#061b32] hover:border-[#9fdbda] transition-colors text-center"
                    >
                      View Posts
                    </Link>
                    {isMember ? (
                      <button
                        onClick={() => leaveCommunity(c.id)}
                        disabled={joiningId === c.id}
                        className="flex-1 rounded-xl border border-[#e2e8f0] py-2 text-xs font-medium text-[#061b32]/50 hover:border-red-200 hover:text-red-400 transition-all disabled:opacity-50"
                      >
                        {joiningId === c.id ? "Leaving..." : "Leave"}
                      </button>
                    ) : (
                      <button
                        onClick={() => joinCommunity(c.id)}
                        disabled={joiningId === c.id}
                        className="flex-1 rounded-xl bg-[#9fdbda] py-2 text-xs font-semibold text-[#061b32] hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {joiningId === c.id ? "Joining..." : "Join"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Request community modal */}
      {showRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#061b32]">
                Request a Community
              </h2>
              <button
                onClick={() => setShowRequest(false)}
                className="text-[#061b32]/40 hover:text-[#061b32]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {reqSuccess ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9fdbda"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-semibold text-[#061b32]">
                  Request submitted!
                </p>
                <p className="text-sm text-[#061b32]/50 mt-1">
                  We'll review and add your community soon.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Community Name
                  </label>
                  <input
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    placeholder="e.g. PCCOE, Infosys Pune"
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["COLLEGE", "COMPANY"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setReqType(t)}
                        className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${reqType === t ? "bg-[#061b32] text-white border-[#061b32]" : "bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]"}`}
                      >
                        {t === "COLLEGE" ? "College" : "Company"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    City
                  </label>
                  <input
                    value={reqCity}
                    onChange={(e) => setReqCity(e.target.value)}
                    placeholder="e.g. Pune"
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#061b32]">
                    Official Website{" "}
                    <span className="font-normal text-[#061b32]/30">
                      (optional)
                    </span>
                  </label>
                  <input
                    value={reqWebsite}
                    onChange={(e) => setReqWebsite(e.target.value)}
                    placeholder="https://pccoe.org"
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                  />
                </div>
                <button
                  onClick={submitRequest}
                  disabled={reqSubmitting || !reqName || !reqCity}
                  className="w-full rounded-xl bg-[#9fdbda] py-3 text-sm font-semibold text-[#061b32] hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {reqSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
