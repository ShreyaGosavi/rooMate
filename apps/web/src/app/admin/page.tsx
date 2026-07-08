"use client";
import Navbar from "@/components/layout/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

type Property = {
  id: string;
  title: string;
  propertyType: string;
  rent: number;
  deposit: number;
  maintenance: number;
  sharing: number;
  locality: string;
  city: string;
  state: string;
  formattedAddress: string;
  ownerPhone: string;
  visitingHrs: string;
  availableFrom: string;
  genderPreference: string;
  bhk: string;
  images: string[];
  amenities: string[];
  rules: string;
  verificationStatus: string;
  createdAt: string;
  ownerId: string;
  ownershipProof: string;
  suitableFitFor: string[];
};

type CommunityRequest = {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"properties" | "communities">("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [communities, setCommunities] = useState<CommunityRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<Property | null>(null);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [proofLoading, setProofLoading] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.allSettled([
        api.get("/api/admin/properties/pending"),
        api.get("/api/admin/communities/requests"),
      ]);
      if (pRes.status === "fulfilled")
        setProperties(pRes.value.data.results ?? pRes.value.data ?? []);
      if (cRes.status === "fulfilled") setCommunities(cRes.value.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const openProperty = async (p: Property) => {
    setSelected(p);
    setProofUrl(null);
    setOwnerEmail("");
    if (p.ownershipProof) {
      setProofLoading(true);
      try {
        const res = await api.get(`/api/listings/${p.id}/proof-url`);
        setProofUrl(res.data.url ?? null);
      } catch {
      } finally {
        setProofLoading(false);
      }
    }
    try {
      const userRes = await api.get(`/api/auth/users/${p.ownerId}`);
      setOwnerEmail(userRes.data.email ?? "");
    } catch {}
  };

  const verifyProperty = async (
    id: string,
    status: "VERIFIED" | "REJECTED",
  ) => {
    setActionLoading(id + status);
    try {
      let ownerEmail = "";
      ownerEmail =
        ownerEmail ||
        (selected?.ownerId
          ? (
              await api
                .get(`/api/auth/users/${selected.ownerId}`)
                .catch(() => ({ data: { email: "" } }))
            ).data.email
          : "");
      await api.patch(`/api/admin/properties/${id}/verify`, {
        status,
        ownerEmail,
      });
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setSelected(null);
    } catch {
      alert("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const updateCommunity = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    setActionLoading(id + status);
    try {
      await api.patch(`/api/admin/communities/requests/${id}/status`, {
        status,
      });
      setCommunities((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const parseRules = (rules: string) => {
    try {
      return JSON.parse(rules)?.rules ?? [];
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#061b32]">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-[#061b32]/50">
            Review and moderate listings and community requests.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <p className="text-xs font-medium text-[#061b32]/50 uppercase tracking-wide">
              Pending Properties
            </p>
            <p className="mt-1 text-3xl font-bold text-[#061b32]">
              {properties.length}
            </p>
          </div>
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <p className="text-xs font-medium text-[#061b32]/50 uppercase tracking-wide">
              Community Requests
            </p>
            <p className="mt-1 text-3xl font-bold text-[#061b32]">
              {communities.length}
            </p>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          {(["properties", "communities"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all capitalize ${tab === t ? "bg-[#061b32] text-white" : "bg-white border border-[#e2e8f0] text-[#061b32]/60 hover:bg-[#f0f7f7]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Main content + detail panel */}
        <div className={`flex gap-6 ${selected ? "items-start" : ""}`}>
          {/* List */}
          <div className={selected ? "w-[40%] shrink-0" : "w-full"}>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-2xl bg-white border border-[#e2e8f0]"
                  />
                ))}
              </div>
            ) : tab === "properties" ? (
              properties.length === 0 ? (
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-16 text-center">
                  <p className="text-lg font-semibold text-[#061b32]">
                    No pending properties
                  </p>
                  <p className="mt-1 text-sm text-[#061b32]/40">
                    All listings have been reviewed.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {properties.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => openProperty(p)}
                      className={`cursor-pointer rounded-2xl border bg-white p-4 transition-all hover:border-[#9fdbda]/50 ${selected?.id === p.id ? "border-[#9fdbda]" : "border-[#e2e8f0]"}`}
                    >
                      <div className="flex gap-3">
                        {p.images?.[0] && (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="h-16 w-20 rounded-xl object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#061b32] text-sm">
                            {p.title}
                          </p>
                          <p className="text-xs text-[#061b32]/50 mt-0.5">
                            {p.locality}, {p.city}
                          </p>
                          <div className="mt-1.5 flex gap-1.5 flex-wrap">
                            <span className="rounded-full bg-[#9fdbda]/20 px-2 py-0.5 text-xs font-medium text-[#061b32]">
                              ₹{p.rent.toLocaleString()}/mo
                            </span>
                            <span className="rounded-full bg-[#f0f7f7] px-2 py-0.5 text-xs text-[#061b32]/60">
                              {p.bhk}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : communities.length === 0 ? (
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-16 text-center">
                <p className="text-lg font-semibold text-[#061b32]">
                  No community requests
                </p>
                <p className="mt-1 text-sm text-[#061b32]/40">
                  All requests have been reviewed.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {communities.map((c) => {
                  const cr = c as any;
                  return (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-[#e2e8f0] bg-white p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#061b32]">
                            {cr.communityName ?? cr.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {cr.type && (
                              <span className="rounded-full bg-[#9fdbda]/20 px-2.5 py-0.5 text-xs font-medium text-[#061b32]">
                                {cr.type}
                              </span>
                            )}
                            {cr.city && (
                              <span className="rounded-full bg-[#f0f7f7] px-2.5 py-0.5 text-xs text-[#061b32]/60">
                                {cr.city}
                              </span>
                            )}
                            {cr.officialWebsite && (
                              <a
                                href={cr.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-[#f0f7f7] px-2.5 py-0.5 text-xs text-[#9fdbda] hover:opacity-80"
                              >
                                Website ↗
                              </a>
                            )}
                          </div>
                          {cr.email && (
                            <p className="mt-1.5 text-xs text-[#061b32]/50">
                              📧 {cr.email}
                            </p>
                          )}
                          <p className="mt-1.5 text-xs text-[#061b32]/40">
                            Requested {formatDate(c.createdAt)}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => updateCommunity(c.id, "APPROVED")}
                            disabled={!!actionLoading}
                            className="rounded-xl bg-[#9fdbda] px-4 py-2 text-sm font-semibold text-[#061b32] hover:opacity-80 disabled:opacity-40"
                          >
                            {actionLoading === c.id + "APPROVED"
                              ? "..."
                              : "Approve"}
                          </button>
                          <button
                            onClick={() => updateCommunity(c.id, "REJECTED")}
                            disabled={!!actionLoading}
                            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100 disabled:opacity-40"
                          >
                            {actionLoading === c.id + "REJECTED"
                              ? "..."
                              : "Reject"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="flex-1 rounded-2xl border border-[#e2e8f0] bg-white p-6 sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold text-[#061b32]">
                  {selected.title}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[#061b32]/30 hover:text-[#061b32] text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Photos */}
              {selected.images?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
                  {selected.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="h-32 w-44 rounded-xl object-cover shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Key details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  ["Rent", `₹${selected.rent.toLocaleString()}/mo`],
                  ["Deposit", `₹${selected.deposit.toLocaleString()}`],
                  ["Maintenance", `₹${selected.maintenance.toLocaleString()}`],
                  ["Sharing", `${selected.sharing} person`],
                  ["BHK", selected.bhk],
                  ["Type", selected.propertyType],
                  ["Gender", selected.genderPreference],
                  ["Visiting Hrs", selected.visitingHrs || "—"],
                  [
                    "Available From",
                    selected.availableFrom
                      ? formatDate(selected.availableFrom)
                      : "—",
                  ],
                  ["Phone", selected.ownerPhone],
                  ["Owner Email", ownerEmail || "Loading..."],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-[#f8fafa] px-3 py-2"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-[#061b32]/40">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-[#061b32] mt-0.5">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="rounded-xl bg-[#f8fafa] px-3 py-2 mb-4">
                <p className="text-[10px] uppercase tracking-wide text-[#061b32]/40 mb-1">
                  Address
                </p>
                <p className="text-sm text-[#061b32]">
                  {selected.formattedAddress ||
                    `${selected.locality}, ${selected.city}, ${selected.state}`}
                </p>
              </div>

              {/* Suitable for */}
              {selected.suitableFitFor?.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-wide text-[#061b32]/40 mb-2">
                    Suitable For
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.suitableFitFor.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-[#9fdbda]/20 px-2.5 py-0.5 text-xs text-[#061b32]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {selected.amenities?.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-wide text-[#061b32]/40 mb-2">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-[#f0f7f7] px-2.5 py-0.5 text-xs text-[#061b32]/70"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rules */}
              {selected.rules && parseRules(selected.rules).length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-wide text-[#061b32]/40 mb-2">
                    House Rules
                  </p>
                  <ul className="space-y-1">
                    {parseRules(selected.rules).map((r: string, i: number) => (
                      <li
                        key={i}
                        className="text-sm text-[#061b32]/70 flex gap-2"
                      >
                        <span className="text-[#9fdbda]">·</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ownership proof */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-wide text-[#061b32]/40 mb-2">
                  Ownership Proof
                </p>
                {proofLoading ? (
                  <div className="h-40 rounded-xl bg-[#f8fafa] animate-pulse" />
                ) : proofUrl ? (
                  <a href={proofUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={proofUrl}
                      alt="Ownership proof"
                      className="w-full rounded-xl object-cover max-h-48 border border-[#e2e8f0] hover:opacity-90 transition-opacity"
                    />
                  </a>
                ) : (
                  <p className="text-sm text-[#061b32]/40">No proof uploaded</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => verifyProperty(selected.id, "VERIFIED")}
                  disabled={!!actionLoading}
                  className="flex-1 rounded-xl bg-[#9fdbda] py-3 text-sm font-semibold text-[#061b32] hover:opacity-80 disabled:opacity-40 transition-opacity"
                >
                  {actionLoading === selected.id + "VERIFIED"
                    ? "Approving..."
                    : "✓ Approve"}
                </button>
                <button
                  onClick={() => verifyProperty(selected.id, "REJECTED")}
                  disabled={!!actionLoading}
                  className="flex-1 rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-500 hover:bg-red-100 disabled:opacity-40 transition-colors"
                >
                  {actionLoading === selected.id + "REJECTED"
                    ? "Rejecting..."
                    : "✕ Reject"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
