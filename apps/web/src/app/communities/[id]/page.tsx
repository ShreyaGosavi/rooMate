'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

const NOTICE_TYPE_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  ROOMMATE_NEEDED: { label: 'Roommates', bg: 'bg-blue-50', color: 'text-blue-500' },
  SPARE_ITEM_GIVEAWAY: { label: 'For Sale', bg: 'bg-orange-50', color: 'text-orange-500' },
  MESS_RECOMMENDATION: { label: 'Recommendations', bg: 'bg-purple-50', color: 'text-purple-500' },
  GENERAL: { label: 'General', bg: 'bg-[#f0f7f7]', color: 'text-[#061b32]/60' },
};

const TABS = ['All Posts', 'Roommates', 'For Sale', 'Recommendations', 'General'];

const TAB_TO_TYPE: Record<string, string | null> = {
  'All Posts': null,
  'Roommates': 'ROOMMATE_NEEDED',
  'For Sale': 'SPARE_ITEM_GIVEAWAY',
  'Recommendations': 'MESS_RECOMMENDATION',
  'General': 'GENERAL',
};

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [community, setCommunity] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Posts');
  const [isMember, setIsMember] = useState(false);
  const [joining, setJoining] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [myId, setMyId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [myName, setMyName] = useState('');

  // Create post form
  const [postType, setPostType] = useState('GENERAL');
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const li = isLoggedIn();
    setLoggedIn(li);
    if (li) {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setMyId(payload.sub);
        }
      } catch {}
    }
    fetchCommunity();
    fetchNotices(null);
  }, [params.id]);

  const fetchCommunity = async () => {
    try {
      const res = await api.get('/api/communities?query=');
      const all = res.data.communities || res.data || [];
      const found = all.find((c: any) => c.id === params.id);
      if (found) setCommunity(found);

      if (isLoggedIn()) {
        try {
          const myRes = await api.get('/api/communities/my');
          const myData = Array.isArray(myRes.data) ? myRes.data : (myRes.data?.communities || []);
          const myIds = myData.map((c: any) => c.communityId || c.community?.id || c.id);
          console.log('My community IDs:', myIds, 'Current:', params.id);
          setIsMember(myIds.includes(params.id as string));
        } catch (e) {
          console.error('Failed to fetch my communities:', e);
        }
      }
    } catch {}
  };

  const fetchNotices = async (type: string | null) => {
    setLoading(true);
    try {
      const url = type
        ? `/api/communities/${params.id}/notices?type=${type}`
        : `/api/communities/${params.id}/notices`;
      const res = await api.get(url);
      setNotices(res.data || []);
    } catch {} finally { setLoading(false); }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    fetchNotices(TAB_TO_TYPE[tab]);
  };

  const joinCommunity = async () => {
    if (!loggedIn) { router.push('/login'); return; }
    setJoining(true);
    try {
      await api.post(`/api/communities/${params.id}/join`);
      setIsMember(true);
    } catch {} finally { setJoining(false); }
  };

  const leaveCommunity = async () => {
    setJoining(true);
    try {
      await api.delete(`/api/communities/${params.id}/leave`);
      setIsMember(false);
    } catch {} finally { setJoining(false); }
  };

  const createPost = async () => {
    if (!postTitle || !postDesc) return;
    setPosting(true);
    try {
      const res = await api.post(`/api/communities/${params.id}/notices`, {
        type: postType, title: postTitle, description: postDesc,
        metadata: { postedByName: myName },
      });
      setNotices(prev => [res.data, ...prev]);
      setPostTitle(''); setPostDesc(''); setPostType('GENERAL');
      setShowCreate(false);
    } catch {} finally { setPosting(false); }
  };

  const deletePost = async (noticeId: string) => {
    try {
      await api.delete(`/api/communities/${params.id}/notices/${noticeId}`);
      setNotices(prev => prev.filter(n => n.id !== noticeId));
    } catch {}
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafa]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <Link href="/"><Image src="/logo.svg" alt="RooMate" width={110} height={28} priority /></Link>
          <div className="flex items-center gap-4">
            <Link href="/communities" className="text-sm text-[#061b32]/50 hover:text-[#061b32]">← Communities</Link>
            <Link href="/profile" className="text-sm text-[#061b32]/50 hover:text-[#061b32]">Profile</Link>
          </div>
        </div>
      </nav>

      <div className="px-8 py-8 max-w-4xl">
        {/* Community header */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9fdbda]/20 text-xl font-bold text-[#061b32]">
                {community?.name?.slice(0, 2).toUpperCase() || '..'}
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#061b32]">{community?.name || 'Community'}</h1>
                <p className="text-sm text-[#061b32]/50 mt-0.5">Connect. Share. Help each other.</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="rounded-full bg-[#f0f7f7] px-2.5 py-0.5 text-xs text-[#061b32]/50">{community?.type === 'COLLEGE' ? 'College' : 'Company'}</span>
                  <span className="text-xs text-[#061b32]/40">{community?.city}</span>
                  {community?.officialWebsite && (
                    <a href={community.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-xs text-[#9fdbda] hover:opacity-80">Website →</a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isMember && (
                <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 rounded-xl bg-[#9fdbda] px-4 py-2 text-sm font-semibold text-[#061b32] hover:opacity-90 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create Post
                </button>
              )}
              {isMember ? (
                <button onClick={leaveCommunity} disabled={joining} className="rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm font-medium text-[#061b32]/50 hover:border-red-200 hover:text-red-400 transition-all disabled:opacity-50">
                  {joining ? 'Leaving...' : 'Leave'}
                </button>
              ) : (
                <button onClick={joinCommunity} disabled={joining} className="rounded-xl bg-[#061b32] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                  {joining ? 'Joining...' : 'Join Community'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-5 border-b border-[#e2e8f0] overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => handleTabChange(tab)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${activeTab === tab ? 'border-[#9fdbda] text-[#061b32]' : 'border-transparent text-[#061b32]/40 hover:text-[#061b32]'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white p-5 animate-pulse">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#f0f7f7]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 rounded bg-[#f0f7f7]" />
                    <div className="h-3 w-64 rounded bg-[#f0f7f7]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <p className="font-semibold text-[#061b32]">No posts yet</p>
            <p className="text-sm text-[#061b32]/40 mt-1">{isMember ? 'Be the first to post!' : 'Join the community to post'}</p>
            {isMember && <button onClick={() => setShowCreate(true)} className="mt-4 rounded-xl bg-[#061b32] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">Create Post</button>}
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map(n => {
              const config = NOTICE_TYPE_CONFIG[n.type] || { label: 'General', bg: 'bg-[#f0f7f7]', color: 'text-[#061b32]/60' };
              const isOwner = n.postedById === myId;
              return (
                <div key={n.id} className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/20 text-sm font-bold text-[#061b32]">
                      {n.postedById?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-[#061b32] text-sm">{n.title}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>{config.label}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <p className="text-xs text-[#061b32]/30">{formatTime(n.createdAt)}</p>
                          {isOwner && (
                            <button onClick={() => deletePost(n.id)} className="text-[#061b32]/20 hover:text-red-400 transition-colors">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-1.5 text-sm text-[#061b32]/60 leading-relaxed">{n.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs text-[#061b32]/30">{(n.metadata as any)?.postedByName || 'Community Member'}</p>
                        {n.postedById !== myId && (
                          <button
                            onClick={async () => {
                              if (!isLoggedIn()) { window.location.href = '/login'; return; }
                              try {
                                const res = await api.post('/api/conversations', { otherUserId: n.postedById });
                                window.location.href = `/conversations?id=${res.data._id}`;
                              } catch (e: any) {
                                console.error('Conversation error:', e?.response?.data || e.message);
                                alert(e?.response?.data?.message || 'Failed to open conversation');
                              }
                            }}
                            className="flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-xs font-medium text-[#061b32] hover:border-[#9fdbda] transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            Message
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create post modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#061b32]">Create Post</h2>
              <button onClick={() => setShowCreate(false)} className="text-[#061b32]/40 hover:text-[#061b32]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#061b32]">Post Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(NOTICE_TYPE_CONFIG).map(([key, val]) => (
                    <button key={key} onClick={() => setPostType(key)} className={`rounded-xl border py-2 text-xs font-medium transition-all ${postType === key ? 'bg-[#061b32] text-white border-[#061b32]' : 'bg-white text-[#061b32] border-[#e2e8f0] hover:border-[#9fdbda]'}`}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#061b32]">Title</label>
                <input value={postTitle} onChange={e => setPostTitle(e.target.value)} placeholder="e.g. Roommate needed near PCCOE" className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#061b32]">Description</label>
                <textarea value={postDesc} onChange={e => setPostDesc(e.target.value)} placeholder="Add more details..." rows={4} className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm text-[#061b32] focus:border-[#9fdbda] focus:outline-none resize-none" />
              </div>
              <button onClick={createPost} disabled={posting || !postTitle || !postDesc} className="w-full rounded-xl bg-[#9fdbda] py-3 text-sm font-semibold text-[#061b32] hover:opacity-90 disabled:opacity-50 transition-opacity">
                {posting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
