"use client";
import Navbar from "@/components/layout/navbar";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

const STEPS = [
  "Basic Details",
  "Location",
  "Room Details",
  "Amenities",
  "Photo Time",
];

const PROPERTY_TYPES = [
  {
    key: "APARTMENT",
    label: "Apartment",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
  {
    key: "PG_HOSTEL",
    label: "PG / Hostel",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "OTHER",
    label: "Other",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
];

const BHK_OPTIONS = [
  { key: "ONE_RK", label: "1 RK" },
  { key: "ONE_BHK", label: "1 BHK" },
  { key: "TWO_BHK", label: "2 BHK" },
  { key: "THREE_BHK", label: "3 BHK" },
  { key: "FOUR_BHK", label: "4 BHK" },
];

const SHARING_OPTIONS = [
  { key: 1, label: "Private Room", sub: "No sharing" },
  { key: 2, label: "2 People", sub: "Shared room" },
  { key: 3, label: "3 People", sub: "Shared room" },
  { key: 4, label: "4 People", sub: "Shared room" },
];

const AMENITIES = [
  { key: "WIFI", label: "WiFi" },
  { key: "AC", label: "AC" },
  { key: "PARKING", label: "Parking" },
  { key: "LAUNDRY", label: "Laundry" },
  { key: "GYM", label: "Gym" },
  { key: "POWER_BACKUP", label: "Power Backup" },
  { key: "WATER_SUPPLY", label: "Water Supply" },
  { key: "FURNISHED_BED", label: "Furnished Bed" },
  { key: "ATTACHED_BATHROOM", label: "Attached Bathroom" },
  { key: "SECURITY", label: "Security" },
  { key: "CCTV", label: "CCTV" },
  { key: "LIFT", label: "Lift" },
  { key: "PURIFIER", label: "Water Purifier" },
];

const NAV_LINKS = [
  {
    href: "/listings",
    label: "Browse",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/listings/my",
    label: "My Properties",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/conversations",
    label: "Messages",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/saved",
    label: "Saved",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    href: "/communities",
    label: "Community",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function CreateListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Step 1
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");

  // Step 2
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState(18.5204);
  const [longitude, setLongitude] = useState(73.8567);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Step 3
  const [bhk, setBhk] = useState("");
  const [sharing, setSharing] = useState<number>(1);
  const [genderPreference, setGenderPreference] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [suitableFitFor, setSuitableFitFor] = useState<string[]>([]);
  const [nearbyInput, setNearbyInput] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [visitFrom, setVisitFrom] = useState("");
  const [visitTo, setVisitTo] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");

  // Step 4
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const [ruleInput, setRuleInput] = useState("");

  // Step 5
  const [photos, setPhotos] = useState<File[]>([]);
  const [proof, setProof] = useState<File | null>(null);

  // Init Google Maps on step 2
  useEffect(() => {
    if (step !== 1) return;
    if (mapRef.current) return;

    const initMap = async () => {
      const { setOptions, importLibrary } =
        await import("@googlemaps/js-api-loader");
      setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
        version: "weekly",
        libraries: ["places"],
      });

      const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      if (!mapContainerRef.current) return;

      const map = new Map(mapContainerRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapId: "roomate-map",
      });

      const markerEl = document.createElement("div");
      markerEl.style.cssText =
        "width:24px;height:24px;background:#9fdbda;border:3px solid #061b32;border-radius:50%;cursor:grab;";

      const marker = new AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map,
        content: markerEl,
        gmpDraggable: true,
        title: "Drag to set location",
      });

      marker.addListener("dragend", () => {
        const pos = marker.position as google.maps.LatLngLiteral;
        if (pos) {
          setLatitude(pos.lat as number);
          setLongitude(pos.lng as number);
          reverseGeocode(pos.lat as number, pos.lng as number);
        }
      });

      map.addListener("click", (e: any) => {
        marker.position = e.latLng;
        setLatitude(e.latLng.lat());
        setLongitude(e.latLng.lng());
        reverseGeocode(e.latLng.lat(), e.latLng.lng());
      });

      mapRef.current = map;
      markerRef.current = marker;
    };

    initMap();

    return () => {
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [step]);

  const reverseGeocode = async (lat: number, lng: number, google?: any) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        const result = data.results[0];
        setFormattedAddress(result.formatted_address || "");
        const components = result.address_components || [];
        const get = (type: string) =>
          components.find((c: any) => c.types.includes(type))?.long_name || "";
        setLocality(
          get("sublocality_level_1") ||
            get("sublocality") ||
            get("neighborhood"),
        );
        setCity(get("locality"));
        setDistrict(
          get("administrative_area_level_3") ||
            get("administrative_area_level_2"),
        );
        setState(get("administrative_area_level_1"));
        setPostalCode(get("postal_code"));
        setCountry(get("country"));
      }
    } catch {}
  };

  const searchAddress = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&region=in`,
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {}
  };

  const selectResult = (result: any) => {
    const lat = result.geometry.location.lat;
    const lng = result.geometry.location.lng;
    setLatitude(lat);
    setLongitude(lng);
    setFormattedAddress(result.formatted_address);
    setSearchResults([]);
    setSearchQuery(result.formatted_address.split(",")[0]);
    if (mapRef.current && markerRef.current) {
      mapRef.current.setCenter({ lat, lng });
      mapRef.current.setZoom(16);
      markerRef.current.position = { lat, lng };
    }
    reverseGeocode(lat, lng);
  };

  const addNearbyPlace = () => {
    const val = nearbyInput.trim();
    if (val && !suitableFitFor.includes(val)) {
      setSuitableFitFor((p) => [...p, val]);
      setNearbyInput("");
    }
  };

  const removeNearbyPlace = (place: string) => {
    setSuitableFitFor((p) => p.filter((x) => x !== place));
  };

  const addRule = () => {
    const val = ruleInput.trim();
    if (val) {
      setRules((p) => [...p, val]);
      setRuleInput("");
    }
  };

  const removeRule = (i: number) =>
    setRules((p) => p.filter((_, idx) => idx !== i));

  const toggleAmenity = (key: string) =>
    setSelectedAmenities((p) =>
      p.includes(key) ? p.filter((a) => a !== key) : [...p, key],
    );

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("propertyType", propertyType);
      fd.append("bhk", bhk);
      fd.append("rent", rent);
      fd.append("deposit", deposit);
      fd.append("maintenance", maintenance || "0");
      fd.append("sharing", String(sharing));
      fd.append("genderPreference", genderPreference);
      suitableFitFor.forEach((s) => fd.append("suitableFitFor", s));
      fd.append("addressLine1", addressLine1);
      if (addressLine2) fd.append("addressLine2", addressLine2);
      fd.append("locality", locality);
      fd.append("city", city);
      fd.append("district", district);
      fd.append("state", state);
      fd.append("country", country);
      fd.append("postalCode", postalCode);
      fd.append("latitude", String(latitude));
      fd.append("longitude", String(longitude));
      if (formattedAddress) fd.append("formattedAddress", formattedAddress);
      fd.append("ownerPhone", ownerPhone);
      if (visitFrom && visitTo)
        fd.append("visitingHrs", `${visitFrom} - ${visitTo}`);
      if (availableFrom) fd.append("availableFrom", availableFrom);
      selectedAmenities.forEach((a) => fd.append("amenities", a));
      if (rules.length) fd.append("rules", JSON.stringify({ rules }));
      photos.forEach((p) => fd.append("photos", p));
      if (proof) fd.append("ownershipProof", proof);

      await api.post("/api/listings", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/listings/success");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  const inp =
    "w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:border-[#9fdbda] focus:outline-none transition-colors";
  const lbl = "mb-1.5 block text-sm font-medium text-[#061b32]";
  const selBtn = (active: boolean) =>
    `rounded-xl border py-3 text-sm font-medium transition-all ${active ? "bg-[#061b32] text-white border-[#061b32]" : "bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]"}`;

  const preview = (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm">
      <div className="h-44 bg-[#f0f7f7] flex flex-col items-center justify-center text-[#061b32]/20">
        {photos.length > 0 ? (
          <img
            src={URL.createObjectURL(photos[0])}
            alt="preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="mt-2 text-xs">Photos appear in step 5</p>
          </>
        )}
      </div>
      <div className="p-4 space-y-2">
        <p className="font-bold text-[#061b32] text-sm">
          {title || "Your Property Title"}
        </p>
        {propertyType && (
          <span className="inline-block rounded-full bg-[#9fdbda]/20 px-2 py-0.5 text-xs font-medium text-[#061b32]">
            {PROPERTY_TYPES.find((t) => t.key === propertyType)?.label}
          </span>
        )}
        {rent && (
          <p className="text-xs text-[#061b32]/60">
            ₹{rent}/mo · Deposit ₹{deposit}
          </p>
        )}
        {(city || locality) && (
          <p className="text-xs text-[#061b32]/60">
            {[locality, city].filter(Boolean).join(", ")}
          </p>
        )}
        {suitableFitFor.length > 0 && (
          <p className="text-xs text-[#9fdbda] font-medium">
            Near {suitableFitFor.join(", ")}
          </p>
        )}
        {bhk && genderPreference && (
          <p className="text-xs text-[#061b32]/50">
            {bhk.replace("_", " ").replace("BHK", "BHK").replace("RK", "RK")} ·{" "}
            {sharing > 1 ? `${sharing} sharing` : "Private"} ·{" "}
            {genderPreference === "MALE" ? "Boys Only" : "Girls Only"}
          </p>
        )}
        <div className="rounded-xl bg-[#f0f7f7] p-3 mt-2">
          <p className="text-xs text-[#061b32]/60">
            Complete all 5 steps to publish your listing.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafa]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-[#e2e8f0] bg-white px-4 py-6 fixed h-full">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="RooMate"
            width={110}
            height={28}
            priority
          />
        </Link>
        <Link
          href="/listings/create"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#9fdbda] px-4 py-2.5 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity"
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
          List a Property
        </Link>
        <nav className="mt-8 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#061b32]/60 hover:bg-[#f0f7f7] hover:text-[#061b32] transition-colors"
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
        </nav>

      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-56">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="text-2xl font-bold text-[#061b32]">
            List Your Property
          </h1>
          <p className="mt-1 text-sm text-[#061b32]/50 mb-6">
            Fill in the details below to list your property on RooMate.
          </p>

          {/* Stepper */}
          <div className="mb-8 flex items-center">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${i < step ? "bg-[#9fdbda] text-[#061b32]" : i === step ? "bg-[#061b32] text-white shadow-md scale-110" : "bg-white text-[#061b32]/30 border border-[#e2e8f0]"}`}
                  >
                    {i < step ? (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`mt-1 text-xs font-medium whitespace-nowrap ${i === step ? "text-[#9fdbda]" : i < step ? "text-[#061b32]/50" : "text-[#061b32]/20"}`}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 mb-5">
                    <div className="h-[2px] w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-[#9fdbda] transition-all duration-500 ${i < step ? "w-full" : "w-0"}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-6">
            {/* Form */}
            <div className="flex-1 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold text-[#9fdbda] uppercase tracking-wider mb-1">
                Step {step + 1} of {STEPS.length}
              </p>
              <h2 className="text-xl font-bold text-[#061b32]">
                {STEPS[step]}
              </h2>
              <p className="mt-1 text-sm text-[#061b32]/50 mb-6">
                {
                  [
                    "Basic information about your property.",
                    "Pin your property location on the map.",
                    "Room-specific details for better matches.",
                    "Amenities and house rules.",
                    "Upload photos and ownership proof.",
                  ][step]
                }
              </p>

              {/* STEP 1 */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className={lbl}>Property Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Spacious 2BHK near PCCOE, Wakad"
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>Property Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {PROPERTY_TYPES.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setPropertyType(t.key)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-medium transition-all ${propertyType === t.key ? "bg-[#f0f7f7] border-[#9fdbda] text-[#061b32]" : "bg-white border-[#e2e8f0] text-[#061b32]/60 hover:border-[#9fdbda]"}`}
                        >
                          <span
                            className={
                              propertyType === t.key
                                ? "text-[#9fdbda]"
                                : "text-[#061b32]/30"
                            }
                          >
                            {t.icon}
                          </span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>Monthly Rent (₹)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-[#061b32]/40">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={rent}
                          onChange={(e) => setRent(e.target.value)}
                          placeholder="e.g. 8000"
                          className={`${inp} pl-8`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>Security Deposit (₹)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-[#061b32]/40">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={deposit}
                          onChange={(e) => setDeposit(e.target.value)}
                          placeholder="e.g. 16000"
                          className={`${inp} pl-8`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className={lbl}>Search Location</label>
                    <input
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (searchDebounceRef.current)
                          clearTimeout(searchDebounceRef.current);
                        searchDebounceRef.current = setTimeout(
                          () => searchAddress(e.target.value),
                          400,
                        );
                      }}
                      placeholder="Type your address, area or landmark..."
                      className={inp}
                    />
                    {searchResults.length > 0 && (
                      <div className="mt-2 rounded-xl border border-[#e2e8f0] bg-white shadow-lg overflow-hidden relative z-10">
                        {searchResults.map((r, i) => (
                          <button
                            key={i}
                            onClick={() => selectResult(r)}
                            className="w-full px-4 py-3 text-left text-xs text-[#061b32] hover:bg-[#f0f7f7] border-b border-[#e2e8f0] last:border-0"
                          >
                            {r.formatted_address}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={lbl}>
                      Pin Location{" "}
                      <span className="font-normal text-[#061b32]/40">
                        (click on map or drag the marker)
                      </span>
                    </label>
                    <div
                      ref={mapContainerRef}
                      style={{
                        height: "280px",
                        width: "100%",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                      }}
                    />
                    <p className="mt-1 text-xs text-[#061b32]/30">
                      Pinned: {latitude.toFixed(5)}, {longitude.toFixed(5)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className={lbl}>Address Line 1</label>
                      <input
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Flat/House no, Building name"
                        className={inp}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className={lbl}>
                        Address Line 2{" "}
                        <span className="font-normal text-[#061b32]/30">
                          (optional)
                        </span>
                      </label>
                      <input
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Street, Landmark"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Locality</label>
                      <input
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Wakad"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>City</label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Pune"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>District</label>
                      <input
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="e.g. Pune"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>State</label>
                      <input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Maharashtra"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Postal Code</label>
                      <input
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="e.g. 411057"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Country</label>
                      <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className={lbl}>BHK</label>
                    <div className="grid grid-cols-5 gap-2">
                      {BHK_OPTIONS.map((b) => (
                        <button
                          key={b.key}
                          onClick={() => setBhk(b.key)}
                          className={selBtn(bhk === b.key)}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Sharing</label>
                    <div className="grid grid-cols-4 gap-3">
                      {SHARING_OPTIONS.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => setSharing(s.key)}
                          className={`flex flex-col items-center rounded-xl border py-3 text-xs font-medium transition-all ${sharing === s.key ? "bg-[#061b32] text-white border-[#061b32]" : "bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]"}`}
                        >
                          <span className="font-semibold">{s.label}</span>
                          <span
                            className={`text-xs mt-0.5 ${sharing === s.key ? "text-white/60" : "text-[#061b32]/40"}`}
                          >
                            {s.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>This place is for</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: "MALE", label: "Boys Only" },
                        { key: "FEMALE", label: "Girls Only" },
                      ].map((g) => (
                        <button
                          key={g.key}
                          onClick={() => setGenderPreference(g.key)}
                          className={selBtn(genderPreference === g.key)}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Maintenance (₹ per month)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-[#061b32]/40">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={maintenance}
                        onChange={(e) => setMaintenance(e.target.value)}
                        placeholder="e.g. 500"
                        className={`${inp} pl-8`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Near Which College / Office?</label>
                    <p className="text-xs text-[#061b32]/40 mb-2">
                      Add multiple — e.g. PCCOE, DYPCOE, Infosys Hinjawadi
                    </p>
                    <div className="flex gap-2">
                      <input
                        value={nearbyInput}
                        onChange={(e) => setNearbyInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addNearbyPlace()}
                        placeholder="Type and press Enter or Add"
                        className={inp}
                      />
                      <button
                        onClick={addNearbyPlace}
                        className="rounded-xl bg-[#061b32] px-4 text-sm font-semibold text-white hover:opacity-90 whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                    {suitableFitFor.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {suitableFitFor.map((p) => (
                          <span
                            key={p}
                            className="flex items-center gap-1 rounded-full bg-[#9fdbda]/20 border border-[#9fdbda]/40 px-3 py-1 text-xs font-medium text-[#061b32]"
                          >
                            {p}
                            <button
                              onClick={() => removeNearbyPlace(p)}
                              className="ml-1 text-[#061b32]/40 hover:text-red-400"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={lbl}>Owner Contact Number</label>
                    <input
                      value={ownerPhone}
                      onChange={(e) =>
                        setOwnerPhone(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="10-digit number"
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>Site Visit Timings</label>
                    <p className="text-xs text-[#061b32]/40 mb-2">
                      When can interested tenants visit the property in person?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-xs text-[#061b32]/50">
                          From
                        </label>
                        <input
                          type="time"
                          value={visitFrom}
                          onChange={(e) => setVisitFrom(e.target.value)}
                          className={inp}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-[#061b32]/50">
                          To
                        </label>
                        <input
                          type="time"
                          value={visitTo}
                          onChange={(e) => setVisitTo(e.target.value)}
                          className={inp}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Available From</label>
                    <p className="text-xs text-[#061b32]/40 mb-2">
                      When can the tenant move in?
                    </p>
                    <input
                      type="date"
                      value={availableFrom}
                      onChange={(e) => setAvailableFrom(e.target.value)}
                      className={inp}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className={lbl}>Amenities</label>
                    <p className="text-xs text-[#061b32]/40 mb-3">
                      Select all that your property offers.
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {AMENITIES.map((a) => (
                        <button
                          key={a.key}
                          onClick={() => toggleAmenity(a.key)}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${selectedAmenities.includes(a.key) ? "bg-[#f0f7f7] border-[#9fdbda] text-[#061b32]" : "bg-white text-[#061b32]/60 border-[#e2e8f0] hover:border-[#9fdbda]"}`}
                        >
                          {a.label}
                          {selectedAmenities.includes(a.key) && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#9fdbda"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>
                      House Rules{" "}
                      <span className="font-normal text-[#061b32]/30">
                        (optional)
                      </span>
                    </label>
                    <p className="text-xs text-[#061b32]/40 mb-2">
                      Add rules one by one.
                    </p>
                    <div className="flex gap-2 mb-3">
                      <input
                        value={ruleInput}
                        onChange={(e) => setRuleInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addRule()}
                        placeholder="e.g. No smoking"
                        className={inp}
                      />
                      <button
                        onClick={addRule}
                        className="rounded-xl bg-[#061b32] px-4 text-sm font-semibold text-white hover:opacity-90 whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                    {rules.length > 0 && (
                      <div className="space-y-2">
                        {rules.map((r, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-[#f8fafa] px-4 py-2.5"
                          >
                            <span className="text-sm text-[#061b32]">
                              <span className="text-[#9fdbda] font-semibold mr-2">
                                {i + 1}.
                              </span>
                              {r}
                            </span>
                            <button
                              onClick={() => removeRule(i)}
                              className="text-[#061b32]/30 hover:text-red-400 transition-colors"
                            >
                              <svg
                                width="14"
                                height="14"
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
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className={lbl}>Property Photos</label>
                    <p className="text-xs text-[#061b32]/50 mb-3">
                      Upload clear photos of all rooms, kitchen, bathroom, and
                      common areas. Listings with good photos get 3× more
                      enquiries.
                    </p>
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e2e8f0] p-8 text-center cursor-pointer hover:border-[#9fdbda] transition-colors"
                    >
                      <svg
                        className="text-[#9fdbda] mb-2"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p className="text-sm font-medium text-[#061b32]">
                        Click to upload property photos
                      </p>
                      <p className="mt-1 text-xs text-[#061b32]/40">
                        PNG, JPG up to 10MB each · Multiple allowed
                      </p>
                      <input
                        id="photo-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                          setPhotos(Array.from(e.target.files || []))
                        }
                        className="hidden"
                      />
                    </label>
                    {photos.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {photos.map((p, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-[#f0f7f7] px-3 py-1.5 text-xs text-[#061b32]"
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={lbl}>Ownership Proof</label>
                    <p className="text-xs text-[#061b32]/50 mb-3">
                      Upload proof that you own or are authorized to rent this
                      property — electricity bill, property tax receipt, rent
                      agreement, or ownership deed. This helps us verify your
                      listing faster and builds trust with tenants.
                    </p>
                    <label
                      htmlFor="proof-upload"
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e2e8f0] p-8 text-center cursor-pointer hover:border-[#9fdbda] transition-colors"
                    >
                      <svg
                        className="text-[#9fdbda] mb-2"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <p className="text-sm font-medium text-[#061b32]">
                        Click to upload ownership proof
                      </p>
                      <p className="mt-1 text-xs text-[#061b32]/40">
                        PDF, PNG, or JPG · Electricity bill, tax receipt, deed
                        etc.
                      </p>
                      <input
                        id="proof-upload"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setProof(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    {proof && (
                      <p className="mt-2 rounded-lg bg-[#f0f7f7] px-3 py-1.5 text-xs text-[#061b32] w-fit">
                        {proof.name}
                      </p>
                    )}
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
              )}

              {/* Nav */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="rounded-xl border border-[#e2e8f0] px-6 py-3 text-sm font-medium text-[#061b32] hover:border-[#9fdbda] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
                {step < 4 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="flex items-center gap-2 rounded-xl bg-[#061b32] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Save & Continue{" "}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-xl bg-[#9fdbda] px-8 py-3 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Publishing..." : "🚀 Publish Listing"}
                  </button>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="hidden xl:block w-72 shrink-0">
              <p className="text-xs font-semibold text-[#061b32]/40 uppercase tracking-wider mb-3">
                Listing Preview
              </p>
              {preview}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#e2e8f0] bg-white px-5 py-3 flex items-center gap-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9fdbda"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[#061b32]">
                Your information is safe with us.
              </p>
              <p className="text-xs text-[#061b32]/50">
                We don't share your details with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
