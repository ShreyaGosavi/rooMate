'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { isLoggedIn, clearTokens } from '@/lib/auth';
import { getUnreadCount } from '@/lib/notifications';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUnread = useCallback(async () => {
    const count = await getUnreadCount();
    setUnread(count);
  }, []);

  useEffect(() => {
    const logged = isLoggedIn();
    setLoggedIn(logged);
    if (logged) fetchUnread();
  }, [pathname, fetchUnread]);

  useEffect(() => {
    if (!loggedIn) return;
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [loggedIn, fetchUnread]);

  const handleLogout = () => {
    clearTokens();
    setLoggedIn(false);
    setUnread(0);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#061b32]/10 bg-[#fafafa]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <Image src="/logo.svg" alt="RooMate" width={140} height={36} priority />
        </Link>
        {!loggedIn ? (
          <div className="flex items-center gap-8">
            <Link href="/#who-for" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Who For</Link>
            <Link href="/#features" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">How it Works</Link>
            <Link href="/#about" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">About Us</Link>
            <Link href="/login" className="border border-[#061b32] px-5 py-2 text-sm font-medium text-[#061b32] hover:bg-[#061b32] hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="bg-[#061b32] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <Link href="/listings" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Properties</Link>
            <Link href="/communities" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Community</Link>
            <Link href="/conversations" className="text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">Messages</Link>
            <Link href="/notifications" className="relative text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">
              Notifications
              {unread > 0 && (
                <span className="absolute -top-2 -right-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white leading-none">
                  {unread > 99 ? '99+' : unread}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="border border-[#061b32] px-5 py-2 text-sm font-medium text-[#061b32] hover:bg-[#061b32] hover:text-white transition-colors"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
