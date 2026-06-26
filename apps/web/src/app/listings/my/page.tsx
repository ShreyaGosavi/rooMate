'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

const BHK_LABELS: Record<string, string> = {
  ONE_RK: '1 RK', ONE_BHK: '1 BHK', TWO_BHK: '2 BHK', THREE_BHK: '3 BHK', FOUR_BHK: '4 BHK',
};
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: 'Apartment', PG_HOSTEL: 'PG / Hostel', OTHER: 'Other',
};

export default function MyListingsPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');
  const [togglingId, setTogglingId] = useState('');

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const res = await api.get('/api/listings/my');
      setProperties(res.data || []);
    } catch {} finally { setLoading(false); }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      await api.patch(`/api/listings/${id}`, { isAvailable: !current });
      setProperties(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !current } : p));
    } catch {} finally { setTogglingId(''); }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/listings/${id}`);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch {} finally { setDeletingId(''); }
  };

  const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
    VERIFIED: {
      label: 'Verified', bg: 'bg-[#9fdbda]/20', text: 'text-[#061b32]',
      icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    },
    PENDING: {
      label: 'Pending Review', bg: 'bg-yellow-50', text: 'text-yellow-700',
      icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    },
    REJECTED: {
      label: 'Rejected', bg: 'bg-red-50', text: 'text-red-600',
      icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <Link href="/"><Image src="/logo.svg" alt="RooMate" width={110} height={28} priority /></Link>
          <div className="flex items-center gap-4">
            <Link href="/listings" className="text-sm text-[#061b32]/50 hover:text-[#061b32]">Browse</Link>
            <Link href="/notifications" className="text-sm text-[#061b32]/50 hover:text-[#061b32]">Notifications</Link>
            <Link href="/listings/create" className="rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">+ List Property</Link>
          </div>
        </div>
      </nav>

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#061b32]">My Listings</h1>
            <p className="mt-1 text-sm text-[#061b32]/50">{properties.length} {properties.length === 1 ? 'property' : 'properties'} listed</p>
          </div>
          <Link href="/listings/create" className="flex items-center gap-2 rounded-xl bg-[#9fdbda] px-5 py-2.5 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add New Listing
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden animate-pulse">
                <div className="h-48 bg-[#f0f7f7]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#f0f7f7] rounded w-3/4" />
                  <div className="h-3 bg-[#f0f7f7] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-5">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <p className="text-lg font-semibold text-[#061b32]">No listings yet</p>
            <p className="mt-1 text-sm text-[#061b32]/50">Start by listing your first property</p>
            <Link href="/listings/create" className="mt-5 rounded-xl bg-[#061b32] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">List a Property</Link>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map(p => {
              const status = statusConfig[p.verificationStatus] || statusConfig.PENDING;
              return (
                <div key={p.id} className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm">
                  <div className="relative h-48 bg-[#f0f7f7]">
                    {p.images?.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#061b32]/20">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                    <div className={`absolute top-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${status.bg} ${status.text}`}>
                      {status.icon} {status.label}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-[#061b32] text-sm">{p.title}</h3>
                    <p className="mt-0.5 text-xs text-[#061b32]/50">{p.locality ? `${p.locality}, ` : ''}{p.city}</p>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="rounded-full bg-[#f0f7f7] px-2.5 py-1 text-xs text-[#061b32]/60">{BHK_LABELS[p.bhk] || p.bhk}</span>
                      <span className="rounded-full bg-[#f0f7f7] px-2.5 py-1 text-xs text-[#061b32]/60">{PROPERTY_TYPE_LABELS[p.propertyType] || p.propertyType}</span>
                      <span className="rounded-full bg-[#f0f7f7] px-2.5 py-1 text-xs font-medium text-[#061b32]">₹{p.rent?.toLocaleString()}/mo</span>
                    </div>

                    {p.PropertyStats && (
                      <div className="mt-3 flex items-center gap-4 text-xs text-[#061b32]/40">
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          {p.PropertyStats.viewCount} views
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          {p.PropertyStats.saveCount} saved
                        </span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-[#e2e8f0] pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#061b32]/50">Available</span>
                        <button onClick={() => toggleAvailability(p.id, p.isAvailable)} disabled={togglingId === p.id} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${p.isAvailable ? 'bg-[#9fdbda]' : 'bg-[#e2e8f0]'} disabled:opacity-50`}>
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${p.isAvailable ? 'translate-x-4' : 'translate-x-1'}`} />
                        </button>
                        <span className={`text-xs font-medium ${p.isAvailable ? 'text-[#9fdbda]' : 'text-[#061b32]/30'}`}>{p.isAvailable ? 'On' : 'Off'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/listings/${p.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#061b32]/40 hover:border-[#9fdbda] hover:text-[#061b32] transition-all">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </Link>
                        <button onClick={() => deleteProperty(p.id)} disabled={deletingId === p.id} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#061b32]/40 hover:border-red-300 hover:text-red-400 transition-all disabled:opacity-50">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
