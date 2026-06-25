'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  useEffect(() => {
    // Auto-close after 3 seconds if opened in a new tab
    const timer = setTimeout(() => window.close(), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="text-center max-w-sm px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#061b32]">Email Verified!</h1>
        <p className="mt-3 text-sm text-[#061b32]/60">
          Your email <span className="font-medium text-[#061b32]">{email}</span> has been verified successfully.
        </p>
        <p className="mt-4 text-sm text-[#9fdbda] font-medium">
          You can close this tab and continue signing up.
        </p>
        <p className="mt-2 text-xs text-[#061b32]/30">This tab will close automatically in 3 seconds.</p>
      </div>
    </div>
  );
}
