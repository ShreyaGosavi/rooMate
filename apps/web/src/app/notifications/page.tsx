"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

const TYPE_CONFIG: Record<
  string,
  { icon: React.ReactNode; bg: string; color: string }
> = {
  WELCOME: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    bg: "bg-pink-50",
    color: "text-pink-400",
  },
  PROPERTY_CREATED: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    bg: "bg-blue-50",
    color: "text-blue-400",
  },
  PROPERTY_APPROVED: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    bg: "bg-[#9fdbda]/20",
    color: "text-[#9fdbda]",
  },
  PROPERTY_REJECTED: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    bg: "bg-red-50",
    color: "text-red-400",
  },
  COMMUNITY_REQUESTED: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    bg: "bg-purple-50",
    color: "text-purple-400",
  },
  COMMUNITY_APPROVED: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    bg: "bg-[#9fdbda]/20",
    color: "text-[#9fdbda]",
  },
  COMMUNITY_REJECTED: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="17" y1="10" x2="22" y2="10" />
      </svg>
    ),
    bg: "bg-red-50",
    color: "text-red-400",
  },
};

const TYPE_FILTER: Record<string, string[]> = {
  All: [],
  Listings: ["PROPERTY_CREATED", "PROPERTY_APPROVED", "PROPERTY_REJECTED"],
  Community: [
    "COMMUNITY_REQUESTED",
    "COMMUNITY_APPROVED",
    "COMMUNITY_REJECTED",
  ],
  System: ["WELCOME"],
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notifications?limit=50");
      const notifs = Array.isArray(res.data.data)
        ? res.data.data
        : res.data.notifications || res.data || [];
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n: any) => !n.read).length);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await api.patch("/api/notifications/mark-all-read");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch {}
  };

  const markOneRead = async (id: string) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {}
  };

  const deleteOne = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch {}
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const filtered = notifications.filter((n) =>
    activeTab === "All" ? true : TYPE_FILTER[activeTab]?.includes(n.type),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="RooMate"
              width={110}
              height={28}
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/listings"
              className="text-sm text-[#061b32]/50 hover:text-[#061b32] transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/conversations"
              className="text-sm text-[#061b32]/50 hover:text-[#061b32] transition-colors"
            >
              Messages
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left — notifications (3/4) */}
        <div className="w-full lg:w-[60%] px-4 md:px-8 py-8 lg:border-r border-[#e2e8f0]">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9fdbda]/20">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9fdbda"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#061b32]">
                  Notifications
                </h1>
                <p className="text-xs text-[#061b32]/40">
                  Stay updated with everything that matters.
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-sm font-medium text-[#9fdbda] hover:opacity-80 transition-opacity"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {Object.keys(TYPE_FILTER).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === tab ? "bg-[#061b32] text-white" : "bg-[#f8fafa] text-[#061b32]/60 hover:bg-[#f0f7f7]"}`}
              >
                {tab}
                {tab === "All" && unreadCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-[#9fdbda] px-1.5 py-0.5 text-xs font-bold text-[#061b32]">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-[#e2e8f0] p-4 animate-pulse"
                >
                  <div className="h-11 w-11 rounded-full bg-[#f0f7f7] shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 rounded bg-[#f0f7f7]" />
                    <div className="h-3 w-64 rounded bg-[#f0f7f7]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-start py-16">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9fdbda"
                  strokeWidth="1.5"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <p className="text-base font-semibold text-[#061b32]">
                No notifications yet
              </p>
              <p className="mt-1 text-sm text-[#061b32]/40">
                We'll notify you when something happens
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((n) => {
                const config = TYPE_CONFIG[n.type] || {
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  ),
                  bg: "bg-[#f0f7f7]",
                  color: "text-[#061b32]/40",
                };
                return (
                  <div
                    key={n._id}
                    onClick={() => !n.read && markOneRead(n._id)}
                    className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all cursor-pointer ${!n.read ? "border-[#9fdbda]/30 bg-[#f0f7f7]/50" : "border-[#e2e8f0] bg-white hover:bg-[#f8fafa]"}`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}
                    >
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p
                          className={`text-sm ${!n.read ? "font-semibold text-[#061b32]" : "font-medium text-[#061b32]"}`}
                        >
                          {n.title}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <p className="text-xs text-[#061b32]/40">
                            {formatTime(n.createdAt)}
                          </p>
                          {!n.read && (
                            <div className="h-2 w-2 rounded-full bg-[#9fdbda]" />
                          )}
                        </div>
                      </div>
                      <p className="mt-0.5 text-xs text-[#061b32]/50 line-clamp-2">
                        {n.message}
                      </p>
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1.5 inline-block text-xs font-medium text-[#9fdbda] hover:opacity-80"
                        >
                          View →
                        </Link>
                      )}
                    </div>
                    <button
                      onClick={(e) => deleteOne(n._id, e)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 text-[#061b32]/20 hover:text-red-400 transition-all"
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
                );
              })}
            </div>
          )}
        </div>

        {/* Right — illustration (1/4) */}
        <div className="hidden xl:flex w-[40%] shrink-0 flex-col items-center justify-center px-8 py-8">
          <Image
            src="/notification.svg"
            alt="Notifications"
            width={280}
            height={280}
            className="w-full"
          />
          <p className="mt-6 text-center text-sm font-medium text-[#061b32]">
            Never miss an update
          </p>
          <p className="mt-1 text-center text-xs text-[#061b32]/40">
            Get notified about your listings, community activity and more.
          </p>
        </div>
      </div>
    </div>
  );
}
