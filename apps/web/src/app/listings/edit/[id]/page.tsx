"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

const AMENITY_OPTIONS = [
  "WIFI",
  "LAUNDRY",
  "WATER_SUPPLY",
  "FURNISHED_BED",
  "ATTACHED_BATHROOM",
  "PARKING",
  "GYM",
  "POWER_BACKUP",
  "CCTV",
  "LIFT",
];

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    rent: "",
    deposit: "",
    maintenance: "",
    sharing: "",
    visitingHrs: "",
    availableFrom: "",
    suitableFitFor: "" as string,
    amenities: [] as string[],
    rules: "" as string,
    isAvailable: true,
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await api.get(`/api/listings/${id}`);
      const p = res.data;
      let rulesStr = "";
      try {
        const parsed =
          typeof p.rules === "string" ? JSON.parse(p.rules) : p.rules;
        rulesStr = (parsed?.rules ?? []).join("\n");
      } catch {
        rulesStr = "";
      }

      setForm({
        title: p.title ?? "",
        rent: p.rent?.toString() ?? "",
        deposit: p.deposit?.toString() ?? "",
        maintenance: p.maintenance?.toString() ?? "",
        sharing: p.sharing?.toString() ?? "",
        visitingHrs: p.visitingHrs ?? "",
        availableFrom: p.availableFrom ? p.availableFrom.split("T")[0] : "",
        suitableFitFor: (p.suitableFitFor ?? []).join(", "),
        amenities: p.amenities ?? [],
        rules: rulesStr,
        isAvailable: p.isAvailable ?? true,
      });
    } catch {
      router.push("/listings/my");
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (a: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const rulesArr = form.rules
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);
      const suitableArr = form.suitableFitFor
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await api.patch(`/api/listings/${id}`, {
        title: form.title,
        rent: Number(form.rent),
        deposit: Number(form.deposit),
        maintenance: Number(form.maintenance),
        sharing: Number(form.sharing),
        visitingHrs: form.visitingHrs,
        availableFrom: form.availableFrom
          ? new Date(form.availableFrom).toISOString()
          : undefined,
        suitableFitFor: suitableArr,
        amenities: form.amenities,
        rules: rulesArr.length ? { rules: rulesArr } : undefined,
        isAvailable: form.isAvailable,
      });
      router.push("/listings/my");
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#f8fafa] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#9fdbda] border-t-transparent" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
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
            href="/listings/my"
            className="text-sm text-[#061b32]/50 hover:text-[#061b32]"
          >
            ← My Listings
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-bold text-[#061b32] mb-1">Edit Listing</h1>
        <p className="text-sm text-[#061b32]/50 mb-8">
          Update your property details.
        </p>

        <div className="space-y-6">
          {/* Title */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-sm font-semibold text-[#061b32] mb-4">
              Basic Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#061b32]/60 mb-1.5">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "rent", label: "Rent (₹/mo)" },
                  { key: "deposit", label: "Deposit (₹)" },
                  { key: "maintenance", label: "Maintenance (₹)" },
                  { key: "sharing", label: "Sharing (persons)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-[#061b32]/60 mb-1.5">
                      {label}
                    </label>
                    <input
                      type="number"
                      value={(form as any)[key]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [key]: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-sm font-semibold text-[#061b32] mb-4">
              Availability
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#061b32]/60 mb-1.5">
                  Visiting Hours
                </label>
                <input
                  value={form.visitingHrs}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, visitingHrs: e.target.value }))
                  }
                  placeholder="e.g. 10:00 - 18:00"
                  className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#061b32]/60 mb-1.5">
                  Available From
                </label>
                <input
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, availableFrom: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() =>
                  setForm((p) => ({ ...p, isAvailable: !p.isAvailable }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isAvailable ? "bg-[#9fdbda]" : "bg-[#e2e8f0]"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.isAvailable ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
              <span className="text-sm text-[#061b32]/70">
                {form.isAvailable ? "Currently available" : "Not available"}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-sm font-semibold text-[#061b32] mb-4">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${form.amenities.includes(a) ? "bg-[#9fdbda] text-[#061b32]" : "bg-[#f0f7f7] text-[#061b32]/60 hover:bg-[#9fdbda]/20"}`}
                >
                  {a.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Suitable for */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-sm font-semibold text-[#061b32] mb-4">
              Suitable For
            </h2>
            <input
              value={form.suitableFitFor}
              onChange={(e) =>
                setForm((p) => ({ ...p, suitableFitFor: e.target.value }))
              }
              placeholder="e.g. pccoe, dypcoe (comma separated)"
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none"
            />
          </div>

          {/* Rules */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-sm font-semibold text-[#061b32] mb-4">
              House Rules
            </h2>
            <textarea
              value={form.rules}
              onChange={(e) =>
                setForm((p) => ({ ...p, rules: e.target.value }))
              }
              placeholder="One rule per line&#10;e.g. No smoking&#10;No pets"
              rows={4}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/listings/my"
              className="flex-1 rounded-xl border border-[#e2e8f0] py-3 text-center text-sm font-semibold text-[#061b32]/60 hover:bg-[#f0f7f7] transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
