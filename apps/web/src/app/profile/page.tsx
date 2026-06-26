'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { isLoggedIn, clearTokens } from '@/lib/auth';

const BHK_LABELS: Record<string, string> = {
  ONE_RK: '1 RK', ONE_BHK: '1 BHK', TWO_BHK: '2 BHK', THREE_BHK: '3 BHK', FOUR_BHK: '4 BHK',
};
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: 'Apartment', PG_HOSTEL: 'PG / Hostel', OTHER: 'Other',
};

const TABS = ['Overview', 'My Listings', 'Saved', 'Communities'];

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [user, setUser] = useState<any>(null);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [userRes, listingsRes, savedRes, commRes] = await Promise.allSettled([
        api.get('/api/auth/me'),
        api.get('/api/listings/my'),
        api.get('/api/listings/saved'),
        api.get('/api/communities/my'),
      ]);
      if (userRes.status === 'fulfilled') setUser(userRes.value.data);
      if (listingsRes.status === 'fulfilled') setMyListings(listingsRes.value.data || []);
      if (savedRes.status === 'fulfilled') setSavedProperties(savedRes.value.data || []);
      if (commRes.status === 'fulfilled') setCommunities(commRes.value.data || []);
    } catch {} finally { setLoading(false); }
  };

  const handleLogout = () => {
    clearTokens();
    router.push('/');
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      await api.patch(`/api/listings/${id}`, { isAvailable: !current });
      setMyListings(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !current } : p));
    } catch {} finally { setTogglingId(''); }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('Delete this listing?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/listings/${id}`);
      setMyListings(prev => prev.filter(p => p.id !== id));
    } catch {} finally { setDeletingId(''); }
  };

  const unsaveProperty = async (id: string) => {
    try {
      await api.delete(`/api/listings/${id}/save`);
      setSavedProperties(prev => prev.filter((p: any) => p.id !== id));
    } catch {}
  };

  const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
    VERIFIED: { label: 'Verified', bg: 'bg-[#9fdbda]/20', text: 'text-[#061b32]' },
    PENDING: { label: 'Pending', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    REJECTED: { label: 'Rejected', bg: 'bg-red-50', text: 'text-red-600' },
  };

  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const PropertyCard = ({ p, showToggle = false }: { p: any; showToggle?: boolean }) => {
    const status = statusConfig[p.verificationStatus] || statusConfig.PENDING;
    return (
      <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm">
        <div className="relative h-44 bg-[#f0f7f7]">
          {p.images?.length > 0 ? (
            <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[#061b32]/20">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
          )}
          <div className={`absolute top-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${status.bg} ${status.text}`}>
            {status.label}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-[#061b32] text-sm truncate">{p.title}</h3>
          <p className="text-xs text-[#061b32]/50 mt-0.5">{p.locality ? `${p.locality}, ` : ''}{p.city}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-[#061b32]">₹{p.rent?.toLocaleString()}<span className="text-xs font-normal text-[#061b32]/40">/mo</span></span>
            <span className="rounded-full bg-[#f0f7f7] px-2 py-0.5 text-xs text-[#061b32]/60">{BHK_LABELS[p.bhk] || p.bhk}</span>
          </div>
          {showToggle && (
            <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-3">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleAvailability(p.id, p.isAvailable)} disabled={togglingId === p.id} className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${p.isAvailable ? 'bg-[#9fdbda]' : 'bg-[#e2e8f0]'}`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${p.isAvailable ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
                <span className={`text-xs ${p.isAvailable ? 'text-[#9fdbda]' : 'text-[#061b32]/30'}`}>{p.isAvailable ? 'Available' : 'Unavailable'}</span>
              </div>
              <div className="flex gap-1">
                <Link href={`/listings/${p.id}`} className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#061b32]/40 hover:border-[#9fdbda] transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </Link>
                <button onClick={() => deleteProperty(p.id)} disabled={deletingId === p.id} className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#061b32]/40 hover:border-red-300 hover:text-red-400 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                </button>
              </div>
            </div>
          )}
          {!showToggle && (
            <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-3">
              <Link href={`/listings/${p.id}`} className="text-xs font-medium text-[#9fdbda] hover:opacity-80">View →</Link>
              <button onClick={() => unsaveProperty(p.id)} className="text-xs text-[#061b32]/30 hover:text-red-400 transition-colors">Remove</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <Link href="/"><Image src="/logo.svg" alt="RooMate" width={110} height={28} priority /></Link>
          <div className="flex items-center gap-4">
            <Link href="/listings" className="text-sm text-[#061b32]/50 hover:text-[#061b32]">Browse</Link>
            <Link href="/notifications" className="text-sm text-[#061b32]/50 hover:text-[#061b32]">Notifications</Link>
            <Link href="/listings/create" className="rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">+ List Property</Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left sidebar — user card */}
        <div className="w-72 shrink-0 border-r border-[#e2e8f0] bg-white p-6 flex flex-col">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-20 w-20 rounded-full bg-[#f0f7f7] mx-auto" />
              <div className="h-4 w-32 rounded bg-[#f0f7f7] mx-auto" />
              <div className="h-3 w-48 rounded bg-[#f0f7f7] mx-auto" />
            </div>
          ) : (
            <>
              {/* Avatar */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#9fdbda]/20 text-2xl font-bold text-[#061b32] mb-3">
                  {initials}
                </div>
                <h2 className="font-bold text-[#061b32] text-lg">{user?.name || 'User'}</h2>
                <p className="text-xs text-[#061b32]/50 mt-0.5">{user?.email}</p>
                {user?.createdAt && (
                  <p className="text-xs text-[#061b32]/30 mt-1">Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { label: 'Listings', value: myListings.length },
                  { label: 'Saved', value: savedProperties.length },
                  { label: 'Communities', value: communities.length },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-[#f8fafa] p-3 text-center">
                    <p className="text-lg font-bold text-[#061b32]">{s.value}</p>
                    <p className="text-xs text-[#061b32]/40">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-3 mb-6">
                {user?.phone && (
                  <div className="flex items-center gap-2 text-sm text-[#061b32]/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {user.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-[#061b32]/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {user?.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {user?.isEmailVerified ? (
                    <span className="flex items-center gap-1 text-[#9fdbda] text-xs font-medium">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      Email verified
                    </span>
                  ) : (
                    <span className="text-xs text-yellow-500">Email not verified</span>
                  )}
                </div>
              </div>

              <div className="mt-auto space-y-2">
                <Link href="/listings/create" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9fdbda] py-2.5 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  List a Property
                </Link>
                <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] py-2.5 text-sm font-medium text-[#061b32]/60 hover:border-red-200 hover:text-red-400 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right — tabs + content */}
        <div className="flex-1 p-8 min-w-0">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-7 border-b border-[#e2e8f0] pb-0">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${activeTab === tab ? 'border-[#9fdbda] text-[#061b32]' : 'border-transparent text-[#061b32]/40 hover:text-[#061b32]'}`}>
                {tab}
                {tab === 'My Listings' && myListings.length > 0 && <span className="ml-1.5 rounded-full bg-[#f0f7f7] px-1.5 py-0.5 text-xs">{myListings.length}</span>}
                {tab === 'Saved' && savedProperties.length > 0 && <span className="ml-1.5 rounded-full bg-[#f0f7f7] px-1.5 py-0.5 text-xs">{savedProperties.length}</span>}
                {tab === 'Communities' && communities.length > 0 && <span className="ml-1.5 rounded-full bg-[#f0f7f7] px-1.5 py-0.5 text-xs">{communities.length}</span>}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: 'Total Listings', value: myListings.length, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                  { label: 'Active Listings', value: myListings.filter(p => p.isAvailable).length, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
                  { label: 'Saved Properties', value: savedProperties.length, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
                  { label: 'Communities', value: communities.length, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
                    <div className="mb-3">{s.icon}</div>
                    <p className="text-2xl font-bold text-[#061b32]">{s.value}</p>
                    <p className="text-xs text-[#061b32]/50 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent listings preview */}
              {myListings.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#061b32]">Recent Listings</h3>
                    <button onClick={() => setActiveTab('My Listings')} className="text-xs font-medium text-[#9fdbda] hover:opacity-80">View all →</button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {myListings.slice(0, 3).map(p => <PropertyCard key={p.id} p={p} showToggle />)}
                  </div>
                </div>
              )}

              {myListings.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#e2e8f0] p-10 text-center">
                  <svg className="mx-auto mb-3 text-[#9fdbda]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <p className="text-sm font-medium text-[#061b32]">No listings yet</p>
                  <p className="text-xs text-[#061b32]/40 mt-1">List your first property to get started</p>
                  <Link href="/listings/create" className="mt-4 inline-block rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">List a Property</Link>
                </div>
              )}
            </div>
          )}

          {/* My Listings */}
          {activeTab === 'My Listings' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-[#061b32]">{myListings.length} {myListings.length === 1 ? 'listing' : 'listings'}</h3>
                <Link href="/listings/create" className="flex items-center gap-1.5 rounded-xl bg-[#9fdbda] px-4 py-2 text-xs font-semibold text-[#061b32] hover:opacity-90">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add New
                </Link>
              </div>
              {myListings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e2e8f0] p-10 text-center">
                  <p className="text-sm text-[#061b32]/50">No listings yet</p>
                  <Link href="/listings/create" className="mt-3 inline-block rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">List a Property</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {myListings.map(p => <PropertyCard key={p.id} p={p} showToggle />)}
                </div>
              )}
            </div>
          )}

          {/* Saved */}
          {activeTab === 'Saved' && (
            <div>
              <h3 className="font-semibold text-[#061b32] mb-5">{savedProperties.length} saved {savedProperties.length === 1 ? 'property' : 'properties'}</h3>
              {savedProperties.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e2e8f0] p-10 text-center">
                  <svg className="mx-auto mb-3 text-[#9fdbda]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <p className="text-sm text-[#061b32]/50">No saved properties yet</p>
                  <Link href="/listings" className="mt-3 inline-block rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">Browse Listings</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {savedProperties.map((p: any) => <PropertyCard key={p.id} p={p} />)}
                </div>
              )}
            </div>
          )}

          {/* Communities */}
          {activeTab === 'Communities' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-[#061b32]">{communities.length} {communities.length === 1 ? 'community' : 'communities'}</h3>
                <Link href="/communities" className="text-xs font-medium text-[#9fdbda] hover:opacity-80">Browse communities →</Link>
              </div>
              {communities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e2e8f0] p-10 text-center">
                  <svg className="mx-auto mb-3 text-[#9fdbda]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <p className="text-sm text-[#061b32]/50">Not part of any community yet</p>
                  <Link href="/communities" className="mt-3 inline-block rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">Explore Communities</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {communities.map((c: any) => (
                    <Link key={c._id || c.id} href={`/communities/${c._id || c.id}`} className="flex items-start gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9fdbda]/20 text-lg font-bold text-[#061b32]">
                        {c.name?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-[#061b32] text-sm">{c.name}</p>
                        <p className="text-xs text-[#061b32]/50 mt-0.5 line-clamp-2">{c.description}</p>
                        <p className="text-xs text-[#9fdbda] mt-1 font-medium">{c.memberCount || 0} members</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
