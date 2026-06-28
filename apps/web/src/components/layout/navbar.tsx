'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { isLoggedIn, clearTokens } from '@/lib/auth';
import { getUnreadCount, getUnreadMessagesCount } from '@/lib/notifications';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const fetchCounts = useCallback(async () => {
    const [notifCount, msgCount] = await Promise.all([
      getUnreadCount(),
      getUnreadMessagesCount(),
    ]);
    setUnread(notifCount);
    setUnreadMessages(msgCount);
  }, []);

  useEffect(() => {
    const logged = isLoggedIn();
    setLoggedIn(logged);
    if (logged) fetchCounts();
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
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#061b32]/10 bg-[#fafafa]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.svg" alt="RooMate" width={120} height={32} priority />
        </Link>

        {/* Desktop nav */}
        {!loggedIn ? (
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#who-for" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Who For</Link>
            <Link href="/#features" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">How it Works</Link>
            <Link href="/#about" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">About Us</Link>
            <Link href="/login" className="border border-[#061b32] px-5 py-2 text-sm font-medium text-[#061b32] hover:bg-[#061b32] hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="bg-[#061b32] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">Sign up</Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <Link href="/listings" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Properties</Link>
            <Link href="/communities" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Community</Link>
            <Link href="/conversations" className="relative text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">
              Messages
              {unreadMessages > 0 && <span className="absolute -top-2 -right-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white leading-none">{unreadMessages > 99 ? '99+' : unreadMessages}</span>}
            </Link>
            <Link href="/notifications" className="relative text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">
              Notifications
              {unread > 0 && <span className="absolute -top-2 -right-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white leading-none">{unread > 99 ? '99+' : unread}</span>}
            </Link>
            <button onClick={handleLogout} className="border border-[#061b32] px-5 py-2 text-sm font-medium text-[#061b32] hover:bg-[#061b32] hover:text-white transition-colors">Log out</button>
          </div>
        )}

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block h-0.5 w-6 bg-[#061b32] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#061b32] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#061b32] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#061b32]/10 bg-[#fafafa] px-6 py-4 space-y-1">
          {!loggedIn ? (
            <>
              <Link href="/#who-for" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">Who For</Link>
              <Link href="/#features" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">Features</Link>
              <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">How it Works</Link>
              <Link href="/#about" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">About Us</Link>
              <div className="flex gap-3 pt-3">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 border border-[#061b32] py-2.5 text-center text-sm font-medium text-[#061b32]">Log in</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex-1 bg-[#061b32] py-2.5 text-center text-sm font-medium text-white">Sign up</Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/listings" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">Properties</Link>
              <Link href="/communities" onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">Community</Link>
              <Link href="/conversations" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">
                Messages
                {unreadMessages > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">{unreadMessages}</span>}
              </Link>
              <Link href="/notifications" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3 text-sm font-medium text-[#061b32] border-b border-[#061b32]/5">
                Notifications
                {unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">{unread}</span>}
              </Link>
              <button onClick={handleLogout} className="w-full mt-2 border border-[#061b32] py-2.5 text-sm font-medium text-[#061b32] text-center">Log out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
