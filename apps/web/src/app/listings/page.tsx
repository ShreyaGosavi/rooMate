'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: 'Apartment',
  PG_HOSTEL: 'PG / Hostel',
  OTHER: 'Other',
};

const BHK_LABELS: Record<string, string> = {
  ONE_RK: '1 RK',
  ONE_BHK: '1 BHK',
  TWO_BHK: '2 BHK',
  THREE_BHK: '3 BHK',
  FOUR_BHK: '4 BHK',
};

const AMENITY_LABELS: Record<string, string> = {
  WIFI: 'Wi-Fi',
  AC: 'AC',
  PARKING: 'Parking',
  LAUNDRY: 'Laundry',
  GYM: 'Gym',
  POWER_BACKUP: 'Power Backup',
  WATER_SUPPLY: 'Water Supply',
  FURNISHED_BED: 'Furnished',
  ATTACHED_BATHROOM: 'Attached Bath',
  SECURITY: 'Security',
  CCTV: 'CCTV',
  LIFT: 'Lift',
  PURIFIER: 'Purifier',
};

export default function BrowseListingsPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loggedIn, setLoggedIn] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bhk, setBhk] = useState('');
  const [gender, setGender] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [page, propertyType, bhk, gender, sortBy]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 9 };
      if (search) params.search = search;
      if (minRent) params.minRent = minRent;
      if (maxRent) params.maxRent = maxRent;
      if (propertyType) params.propertyType = propertyType;
      if (bhk) params.bhk = bhk;
      if (gender) params.gender = gender;
      if (selectedAmenities.length) params.amenities = selectedAmenities;

      const res = await api.get('/api/listings', { params });
      setProperties(res.data.results || []);
      setTotal(res.data.total || 0);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setPage(1);
    fetchProperties();
  };

  const clearFilters = () => {
    setSearch(''); setMinRent(''); setMaxRent('');
    setPropertyType(''); setBhk(''); setGender('');
    setSelectedAmenities([]); setPage(1);
  };

  const toggleAmenity = (key: string) => setSelectedAmenities(p => p.includes(key) ? p.filter(a => a !== key) : [...p, key]);

  const totalPages = Math.ceil(total / 9);

  const visibleAmenities = showMoreAmenities
    ? Object.entries(AMENITY_LABELS)
    : Object.entries(AMENITY_LABELS).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/"><Image src="/logo.svg" alt="RooMate" width={120} height={32} priority /></Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#061b32]/60 hover:text-[#061b32]">Home</Link>
            <Link href="/listings" className="text-sm font-medium text-[#9fdbda] border-b-2 border-[#9fdbda] pb-0.5">Find Rooms</Link>
            <Link href="/conversations" className="text-sm font-medium text-[#061b32]/60 hover:text-[#061b32]">Messages</Link>
            <Link href="/saved" className="text-sm font-medium text-[#061b32]/60 hover:text-[#061b32]">Saved</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/listings/create" className="hidden md:inline-flex rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
              List Your Property
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#061b32]/60 hover:text-[#061b32]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9fdbda]/20 text-[#061b32] font-semibold text-sm hover:bg-[#9fdbda]/30 transition-colors">S</Link>
          </div>
        </div>
      </nav>

      {/* Filter bar */}
      <div className="border-b border-[#e2e8f0] bg-white px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] px-4 py-2.5 flex-1 min-w-[200px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#061b32]/40"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by location, society or landmark" className="text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none w-full bg-transparent" />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] px-4 py-2.5">
            <span className="text-sm text-[#061b32]/50">Budget</span>
            <input type="number" value={minRent} onChange={e => setMinRent(e.target.value)} placeholder="Min" className="w-16 text-sm text-[#061b32] focus:outline-none bg-transparent" />
            <span className="text-[#061b32]/30">-</span>
            <input type="number" value={maxRent} onChange={e => setMaxRent(e.target.value)} placeholder="Max" className="w-16 text-sm text-[#061b32] focus:outline-none bg-transparent" />
          </div>
          <select value={propertyType} onChange={e => { setPropertyType(e.target.value); setPage(1); }} className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:outline-none bg-white">
            <option value="">Property Type</option>
            <option value="APARTMENT">Apartment</option>
            <option value="PG_HOSTEL">PG / Hostel</option>
            <option value="OTHER">Other</option>
          </select>
          <button onClick={applyFilters} className="rounded-xl bg-[#061b32] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            Search
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 flex gap-6">
        {/* Left sidebar filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[#061b32]">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-[#9fdbda] font-medium hover:opacity-80">Clear All</button>
            </div>

            {/* Budget */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#061b32] mb-3">Budget (Monthly)</p>
              <div className="flex gap-2">
                <input type="number" value={minRent} onChange={e => setMinRent(e.target.value)} placeholder="₹ Min" className="w-full rounded-lg border border-[#e2e8f0] px-3 py-2 text-xs text-[#061b32] focus:outline-none focus:border-[#9fdbda]" />
                <input type="number" value={maxRent} onChange={e => setMaxRent(e.target.value)} placeholder="₹ Max" className="w-full rounded-lg border border-[#e2e8f0] px-3 py-2 text-xs text-[#061b32] focus:outline-none focus:border-[#9fdbda]" />
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#061b32] mb-3">Property Type</p>
              <div className="grid grid-cols-2 gap-2">
                {[{ key: '', label: 'All' }, { key: 'APARTMENT', label: 'Apartment' }, { key: 'PG_HOSTEL', label: 'PG / Hostel' }, { key: 'OTHER', label: 'Other' }].map(t => (
                  <button key={t.key} onClick={() => { setPropertyType(t.key); setPage(1); }} className={`rounded-lg border py-2 text-xs font-medium transition-all ${propertyType === t.key ? 'bg-[#061b32] text-white border-[#061b32]' : 'bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#061b32] mb-3">BHK</p>
              <div className="flex flex-wrap gap-2">
                {[{ key: '', label: 'All' }, { key: 'ONE_RK', label: '1 RK' }, { key: 'ONE_BHK', label: '1 BHK' }, { key: 'TWO_BHK', label: '2 BHK' }, { key: 'THREE_BHK', label: '3+ BHK' }].map(b => (
                  <button key={b.key} onClick={() => { setBhk(b.key); setPage(1); }} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${bhk === b.key ? 'bg-[#061b32] text-white border-[#061b32]' : 'bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]'}`}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#061b32] mb-3">Amenities</p>
              <div className="space-y-2">
                {visibleAmenities.map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectedAmenities.includes(key)} onChange={() => toggleAmenity(key)} className="rounded border-[#e2e8f0] accent-[#9fdbda]" />
                    <span className="text-xs text-[#061b32]/70">{label}</span>
                  </label>
                ))}
                <button onClick={() => setShowMoreAmenities(!showMoreAmenities)} className="text-xs text-[#9fdbda] font-medium hover:opacity-80 flex items-center gap-1">
                  {showMoreAmenities ? 'Show Less' : 'Show More'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points={showMoreAmenities ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/></svg>
                </button>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#061b32] mb-3">Preferred For</p>
              <div className="flex gap-2">
                {[{ key: '', label: 'Anyone' }, { key: 'MALE', label: 'Male' }, { key: 'FEMALE', label: 'Female' }].map(g => (
                  <button key={g.key} onClick={() => { setGender(g.key); setPage(1); }} className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-all ${gender === g.key ? 'bg-[#061b32] text-white border-[#061b32]' : 'bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]'}`}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={applyFilters} className="w-full rounded-xl bg-[#061b32] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Results header */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-[#061b32]">
              <span className="font-bold text-[#9fdbda]">{total}</span> properties found
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#061b32]/50">Sort by:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm font-medium text-[#061b32] border-none focus:outline-none bg-transparent">
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-[#e2e8f0] p-1">
                <button onClick={() => setViewMode('grid')} className={`rounded p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#061b32] text-white' : 'text-[#061b32]/40 hover:text-[#061b32]'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </button>
                <button onClick={() => setViewMode('list')} className={`rounded p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#061b32] text-white' : 'text-[#061b32]/40 hover:text-[#061b32]'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden animate-pulse">
                  <div className="h-48 bg-[#f0f7f7]" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-[#f0f7f7] rounded w-3/4" />
                    <div className="h-3 bg-[#f0f7f7] rounded w-1/2" />
                    <div className="h-4 bg-[#f0f7f7] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && properties.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="text-[#9fdbda] mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <p className="text-lg font-semibold text-[#061b32]">No properties found</p>
              <p className="mt-1 text-sm text-[#061b32]/50">Try adjusting your filters</p>
              <button onClick={clearFilters} className="mt-4 rounded-xl bg-[#061b32] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">Clear Filters</button>
            </div>
          )}

          {/* Grid view */}
          {!loading && properties.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <Link key={p.id} href={`/listings/${p.id}`} className="group rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 bg-[#f0f7f7]">
                    {p.images?.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#061b32]/20">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                    {/* Verification badge */}
                    <div className={`absolute top-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${p.verificationStatus === 'VERIFIED' ? 'bg-[#9fdbda] text-[#061b32]' : p.verificationStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                      {p.verificationStatus === 'VERIFIED' ? (
                        <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Verified</>
                      ) : p.verificationStatus === 'PENDING' ? (
                        <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Pending</>
                      ) : (
                        <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Rejected</>
                      )}
                    </div>
                    {/* Save button */}
                    <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-[#061b32]/40 hover:text-red-400 transition-colors" onClick={e => e.preventDefault()}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#061b32] text-sm leading-snug group-hover:text-[#9fdbda] transition-colors">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#061b32]/50">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {p.locality ? `${p.locality}, ` : ''}{p.city}
                    </p>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-base font-bold text-[#061b32]">₹{p.rent.toLocaleString()}<span className="text-xs font-normal text-[#061b32]/50"> / month</span></p>
                        <p className="text-xs text-[#061b32]/40">Deposit: ₹{p.deposit.toLocaleString()}</p>
                      </div>
                      <span className="rounded-full bg-[#9fdbda]/20 px-2 py-0.5 text-xs font-medium text-[#061b32]">{BHK_LABELS[p.bhk] || p.bhk}</span>
                    </div>
                    {p.amenities?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.amenities.slice(0, 3).map((a: string) => (
                          <span key={a} className="rounded-full bg-[#f0f7f7] px-2 py-0.5 text-xs text-[#061b32]/60">{AMENITY_LABELS[a] || a}</span>
                        ))}
                        {p.amenities.length > 3 && <span className="rounded-full bg-[#f0f7f7] px-2 py-0.5 text-xs text-[#061b32]/40">+{p.amenities.length - 3}</span>}
                      </div>
                    )}
                    {p.genderPreference && (
                      <p className="mt-2 text-xs text-[#061b32]/40">{p.genderPreference === 'MALE' ? '👨 Boys Only' : '👩 Girls Only'}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* List view */}
          {!loading && properties.length > 0 && viewMode === 'list' && (
            <div className="space-y-4">
              {properties.map((p) => (
                <Link key={p.id} href={`/listings/${p.id}`} className="group flex gap-4 rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative w-48 shrink-0 bg-[#f0f7f7]">
                    {p.images?.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#061b32]/20">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                    <div className={`absolute top-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${p.verificationStatus === 'VERIFIED' ? 'bg-[#9fdbda] text-[#061b32]' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.verificationStatus === 'VERIFIED' ? '✓ Verified' : '⏳ Pending'}
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#061b32] group-hover:text-[#9fdbda] transition-colors">{p.title}</h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-[#061b32]/50">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {p.locality ? `${p.locality}, ` : ''}{p.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#061b32]">₹{p.rent.toLocaleString()}<span className="text-xs font-normal text-[#061b32]/50">/mo</span></p>
                        <p className="text-xs text-[#061b32]/40">Deposit: ₹{p.deposit.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#9fdbda]/20 px-2.5 py-1 text-xs font-medium text-[#061b32]">{BHK_LABELS[p.bhk] || p.bhk}</span>
                      <span className="rounded-full bg-[#f0f7f7] px-2.5 py-1 text-xs text-[#061b32]/60">{PROPERTY_TYPE_LABELS[p.propertyType] || p.propertyType}</span>
                      {p.sharing > 1 && <span className="rounded-full bg-[#f0f7f7] px-2.5 py-1 text-xs text-[#061b32]/60">{p.sharing} sharing</span>}
                      {p.amenities?.slice(0, 4).map((a: string) => (
                        <span key={a} className="rounded-full bg-[#f0f7f7] px-2.5 py-1 text-xs text-[#061b32]/60">{AMENITY_LABELS[a] || a}</span>
                      ))}
                    </div>
                    {p.suitableFitFor?.length > 0 && (
                      <p className="mt-2 text-xs text-[#9fdbda] font-medium">Near {p.suitableFitFor.join(', ')}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e8f0] text-[#061b32] hover:border-[#9fdbda] disabled:opacity-30">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const p = i + 1;
                return (
                  <button key={p} onClick={() => setPage(p)} className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all ${page === p ? 'bg-[#061b32] text-white' : 'border border-[#e2e8f0] text-[#061b32] hover:border-[#9fdbda]'}`}>{p}</button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e8f0] text-[#061b32] hover:border-[#9fdbda] disabled:opacity-30">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
