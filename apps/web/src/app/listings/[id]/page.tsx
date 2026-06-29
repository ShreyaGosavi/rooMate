"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

const BHK_LABELS: Record<string, string> = {
  ONE_RK: "1 RK",
  ONE_BHK: "1 BHK",
  TWO_BHK: "2 BHK",
  THREE_BHK: "3 BHK",
  FOUR_BHK: "4 BHK",
};
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: "Apartment",
  PG_HOSTEL: "PG / Hostel",
  OTHER: "Other",
};
const AMENITY_LABELS: Record<string, string> = {
  WIFI: "Wi-Fi",
  AC: "AC",
  PARKING: "Parking",
  LAUNDRY: "Laundry",
  GYM: "Gym",
  POWER_BACKUP: "Power Backup",
  WATER_SUPPLY: "Water Supply",
  FURNISHED_BED: "Furnished Bed",
  ATTACHED_BATHROOM: "Attached Bathroom",
  SECURITY: "Security",
  CCTV: "CCTV",
  LIFT: "Lift",
  PURIFIER: "Water Purifier",
};

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [startingConv, setStartingConv] = useState(false);
  const [convError, setConvError] = useState("");
  const [myId, setMyId] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setMyId(payload.sub);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!params.id) return;
    const fetchData = async () => {
      try {
        const [propRes, simRes] = await Promise.all([
          api.get(`/api/listings/${params.id}`),
          api.get(`/api/listings/${params.id}/similar`),
        ]);
        setProperty(propRes.data);
        setSimilar(simRes.data || []);
      } catch {
        router.push("/listings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="space-y-4 w-full max-w-3xl px-6">
          <div className="h-72 rounded-2xl bg-[#f0f7f7] animate-pulse" />
          <div className="h-6 w-2/3 rounded-xl bg-[#f0f7f7] animate-pulse" />
          <div className="h-4 w-1/2 rounded-xl bg-[#f0f7f7] animate-pulse" />
        </div>
      </div>
    );

  const handleMessageOwner = async () => {
    setStartingConv(true);
    try {
      const res = await api.post("/api/conversations", {
        otherUserId: property.ownerId,
      });
      const convId = res.data._id;
      router.push(`/conversations?id=${convId}`);
    } catch {
      setConvError("Please log in to message the owner.");
    } finally {
      setStartingConv(false);
    }
  };

  if (!property) return null;

  const rules = property.rules?.rules || [];
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`;
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${property.latitude},${property.longitude}&zoom=15`;

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="RooMate"
              width={120}
              height={32}
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-sm text-[#061b32]/50 hover:text-[#061b32] transition-colors"
            >
              ← Back
            </button>
            <Link
              href="/listings/create"
              className="rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl overflow-hidden border border-[#e2e8f0]">
              {property.images?.length > 0 ? (
                <>
                  <div className="relative h-80 bg-[#f0f7f7]">
                    <img
                      src={property.images[activePhoto]}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${property.verificationStatus === "VERIFIED" ? "bg-[#9fdbda] text-[#061b32]" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {property.verificationStatus === "VERIFIED" ? (
                        <>
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>{" "}
                          Verified
                        </>
                      ) : (
                        <>
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>{" "}
                          Pending Verification
                        </>
                      )}
                    </div>
                  </div>
                  {property.images.length > 1 && (
                    <div className="flex gap-2 p-3 bg-[#f8fafa] overflow-x-auto">
                      {property.images.map((img: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => setActivePhoto(i)}
                          className={`shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === i ? "border-[#9fdbda]" : "border-transparent"}`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="h-72 bg-[#f0f7f7] flex items-center justify-center text-[#061b32]/20">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-bold text-[#061b32]">
                {property.title}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-[#061b32]/50">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {[
                  property.addressLine1,
                  property.locality,
                  property.city,
                  property.state,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {property.suitableFitFor?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {property.suitableFitFor.map((p: string) => (
                    <span
                      key={p}
                      className="rounded-full bg-[#9fdbda]/20 border border-[#9fdbda]/30 px-3 py-1 text-xs font-medium text-[#061b32]"
                    >
                      Near {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "BHK",
                  value: BHK_LABELS[property.bhk] || property.bhk,
                },
                {
                  label: "Type",
                  value:
                    PROPERTY_TYPE_LABELS[property.propertyType] ||
                    property.propertyType,
                },
                {
                  label: "Sharing",
                  value:
                    property.sharing === 1
                      ? "Private Room"
                      : `${property.sharing} People`,
                },
                {
                  label: "For",
                  value:
                    property.genderPreference === "MALE"
                      ? "Boys Only"
                      : "Girls Only",
                },
              ].map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-[#e2e8f0] bg-[#f8fafa] p-4 text-center"
                >
                  <p className="text-xs text-[#061b32]/40 mb-1">{d.label}</p>
                  <p className="text-sm font-semibold text-[#061b32]">
                    {d.value}
                  </p>
                </div>
              ))}
            </div>

            {property.amenities?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-[#061b32] mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.amenities.map((a: string) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#061b32]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9fdbda"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {AMENITY_LABELS[a] || a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rules.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-[#061b32] mb-4">
                  House Rules
                </h2>
                <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafa] p-5 space-y-3">
                  {rules.map((r: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/20 text-xs font-bold text-[#061b32]">
                        {i + 1}
                      </span>
                      <p className="text-sm text-[#061b32]/70 pt-0.5">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#061b32]">Location</h2>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm font-medium text-[#061b32] hover:border-[#9fdbda] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9fdbda"
                    strokeWidth="2"
                  >
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Get Directions
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] h-64">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs text-[#061b32]/40">
                {property.formattedAddress}
              </p>
            </div>

            {similar.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-[#061b32] mb-4">
                  Similar Properties
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {similar.map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/listings/${p.id}`}
                      className="group flex gap-3 rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="w-24 shrink-0 bg-[#f0f7f7]">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-[#061b32]/20">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-3">
                        <p className="text-sm font-semibold text-[#061b32] group-hover:text-[#9fdbda] transition-colors line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-xs text-[#061b32]/50 mt-0.5">
                          {p.locality}, {p.city}
                        </p>
                        <p className="text-sm font-bold text-[#061b32] mt-1">
                          ₹{p.rent.toLocaleString()}
                          <span className="text-xs font-normal text-[#061b32]/40">
                            /mo
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-[#061b32]">
                    ₹{property.rent?.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#061b32]/50 mb-1">/ month</p>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#061b32]/50">Deposit</span>
                    <span className="font-medium text-[#061b32]">
                      ₹{property.deposit?.toLocaleString()}
                    </span>
                  </div>
                  {property.maintenance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#061b32]/50">Maintenance</span>
                      <span className="font-medium text-[#061b32]">
                        ₹{property.maintenance?.toLocaleString()}/mo
                      </span>
                    </div>
                  )}
                  {property.availableFrom && (
                    <div className="flex justify-between">
                      <span className="text-[#061b32]/50">Available From</span>
                      <span className="font-medium text-[#061b32]">
                        {new Date(property.availableFrom).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </span>
                    </div>
                  )}
                  {property.visitingHrs && (
                    <div className="flex justify-between">
                      <span className="text-[#061b32]/50">Visit Timings</span>
                      <span className="font-medium text-[#061b32]">
                        {property.visitingHrs}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${property.ownerPhone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9fdbda] py-3 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity"
                  >
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
                    Call Owner
                  </a>
                  {myId && myId !== property.ownerId && (
                    <button
                      onClick={handleMessageOwner}
                      disabled={startingConv}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] py-3 text-sm font-semibold text-[#061b32] hover:border-[#9fdbda] transition-colors disabled:opacity-50"
                    >
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
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {startingConv ? "Opening..." : "Message Owner"}
                    </button>
                  )}
                  {convError && (
                    <p className="text-xs text-red-500 text-center">
                      {convError}
                    </p>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafa] p-4">
                <div className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9fdbda"
                    strokeWidth="2"
                    className="shrink-0 mt-0.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-[#061b32]">
                      Safe & Verified
                    </p>
                    <p className="text-xs text-[#061b32]/50 mt-0.5">
                      This listing has been reviewed by our team. Always visit
                      in person before making any payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
