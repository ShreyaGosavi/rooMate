"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { isLoggedIn, clearTokens } from "@/lib/auth";
import { getUnreadCount, getUnreadMessagesCount } from "@/lib/notifications";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("U");
  const router = useRouter();
  const pathname = usePathname();

  const fetchCounts = useCallback(async () => {
    const [notifCount, msgCount] = await Promise.all([getUnreadCount(), getUnreadMessagesCount()]);
    setUnread(notifCount);
    setUnreadMessages(msgCount);
  }, []);

  useEffect(() => {
    const logged = isLoggedIn();
    setLoggedIn(logged);
    if (logged) {
      fetchCounts();
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserInitial((payload.username || payload.email || "U").slice(0, 1).toUpperCase());
        }
      } catch {}
    }
    setMenuOpen(false);
  }, [pathname, fetchCounts]);

  useEffect(() => {
    if (!loggedIn) return;
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, [loggedIn, fetchCounts]);

  const handleLogout = () => {
    clearTokens();
    setLoggedIn(false);
    setUnread(0);
    setUnreadMessages(0);
    setMenuOpen(false);
    router.push("/");
  };

  const isActive = (href: string) => pathname === href;

  const navLink = (href: string, label: string) => (
    <Link href={href}
      className={`relative text-sm font-semibold transition-colors pb-0.5 ${
        isActive(href)
          ? "text-[#9fdbda] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9fdbda] after:rounded-full"
          : "text-[#061b32]/70 hover:text-[#061b32]"
      }`}>
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.svg" alt="RooMate" width={120} height={32} priority />
        </Link>

        {/* Desktop */}
        {!loggedIn ? (
          <div className="hidden md:flex items-center gap-8">
            {navLink("/#who-for", "Who For")}
            {navLink("/#features", "Features")}
            {navLink("/#how-it-works", "How it Works")}
            {navLink("/#about", "About Us")}
            <Link href="/login" className="rounded-xl border-2 border-[#061b32] px-5 py-2.5 text-sm font-semibold text-[#061b32] hover:bg-[#061b32] hover:text-white transition-all">Log in</Link>
            <Link href="/signup" className="rounded-xl bg-[#061b32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9fdbda] hover:text-[#061b32] transition-all">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            {navLink("/listings", "Properties")}
            {navLink("/communities", "Community")}
            <Link href="/conversations" className={`relative text-sm font-semibold transition-colors ${isActive("/conversations") ? "text-[#9fdbda]" : "text-[#061b32]/70 hover:text-[#061b32]"}`}>
              Messages
              {unreadMessages > 0 && <span className="absolute -top-2 -right-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white leading-none">{unreadMessages > 99 ? "99+" : unreadMessages}</span>}
            </Link>
            <Link href="/notifications" className={`relative text-sm font-semibold transition-colors ${isActive("/notifications") ? "text-[#9fdbda]" : "text-[#061b32]/70 hover:text-[#061b32]"}`}>
              Notifications
              {unread > 0 && <span className="absolute -top-2 -right-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white leading-none">{unread > 99 ? "99+" : unread}</span>}
            </Link>
            <Link href="/profile" className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${isActive("/profile") ? "bg-[#9fdbda] text-[#061b32]" : "bg-[#061b32]/10 text-[#061b32] hover:bg-[#9fdbda]"}`}>
              {userInitial}
            </Link>
            <button onClick={handleLogout} className="rounded-xl bg-[#061b32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9fdbda] hover:text-[#061b32] transition-all">
              Log out
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block h-0.5 w-6 bg-[#061b32] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#061b32] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#061b32] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#061b32]/10 bg-white px-6 py-4 space-y-1">
          {!loggedIn ? (
            <>
              <Link href="/#who-for" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">Who For</Link>
              <Link href="/#features" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">Features</Link>
              <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">How it Works</Link>
              <Link href="/#about" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">About Us</Link>
              <div className="flex gap-3 pt-3">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-xl border-2 border-[#061b32] py-2.5 text-center text-sm font-semibold text-[#061b32]">Log in</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex-1 rounded-xl bg-[#061b32] py-2.5 text-center text-sm font-semibold text-white">Sign up</Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/listings" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">Properties</Link>
              <Link href="/communities" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">Community</Link>
              <Link href="/conversations" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">
                Messages
                {unreadMessages > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{unreadMessages}</span>}
              </Link>
              <Link href="/notifications" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3 text-sm font-semibold text-[#061b32]/70 border-b border-[#061b32]/5">
                Notifications
                {unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{unread}</span>}
              </Link>
              <button onClick={handleLogout} className="w-full mt-3 rounded-xl bg-[#061b32] py-2.5 text-sm font-semibold text-white text-center">Log out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
