"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import { useEffect, useState } from "react";
import { isLoggedIn } from "@/lib/auth";

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="h-[2px] w-12 bg-[#9fdbda]" />
      <h2 className="text-3xl font-bold text-[#061b32]">{children}</h2>
      <div className="h-[2px] w-12 bg-[#9fdbda]" />
    </div>
  );
}

function ZigZagSection({
  title, desc, buttonLabel, buttonHref, imageSrc, imageAlt, reverse, steps,
}: {
  title: string; desc: string; buttonLabel: string; buttonHref: string;
  imageSrc: string; imageAlt: string; reverse?: boolean;
  steps: { label: string; icon: React.ReactNode }[];
}) {
  return (
    <div className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${reverse ? "lg:flex-row-reverse" : ""}`}>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-[#061b32]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#061b32]/60">{desc}</p>
        <div className="mt-8 space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/20 text-[#061b32]">{s.icon}</div>
              <div className="flex-1 pt-1.5 text-sm text-[#061b32]/70">{s.label}</div>
            </div>
          ))}
        </div>
        <Link href={buttonHref} className="mt-8 inline-block rounded-xl bg-[#061b32] px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
          {buttonLabel}
        </Link>
      </div>
      <div className="flex-1">
        <Image src={imageSrc} alt={imageAlt} width={540} height={400} className="w-full" />
      </div>
    </div>
  );
}

const HomeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
const MapIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ImageIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const ChatIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const PeopleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const ListIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { setLoggedIn(isLoggedIn()); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg">
            {loggedIn ? (
              <>
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#061b32]">
                  Verified Homes.<br /><span className="text-[#9fdbda]">Vibrant Communities.</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[#061b32]/60">
                  Whether you're searching for a place to live or looking to connect with others nearby, RooMate brings together verified property listings and a trusted community where members can discover roommate opportunities, exchange essentials, and share local insights.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/listings" className="inline-block rounded-xl bg-[#061b32] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">Browse Properties</Link>
                  <Link href="/communities" className="inline-block rounded-xl bg-[#9fdbda]/20 px-8 py-3 text-sm font-semibold text-[#061b32] hover:bg-[#9fdbda]/40 transition-colors">Explore Communities</Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#061b32]">
                  Find your place.<br /><span className="text-[#9fdbda]">Feel at home.</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[#061b32]/60">
                  Whether you're searching for a place to live or looking to connect with others nearby, RooMate brings together verified property listings and a trusted community where members can discover roommate opportunities, exchange essentials, and share local insights.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/signup" className="inline-block rounded-xl bg-[#061b32] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">Get Started</Link>
                  <Link href="/login" className="inline-block rounded-xl bg-[#9fdbda]/20 px-8 py-3 text-sm font-semibold text-[#061b32] hover:bg-[#9fdbda]/40 transition-colors">Log In</Link>
                </div>
              </>
            )}
          </div>
          <div className="w-full max-w-xl lg:max-w-2xl">
            <Image src="/hero.svg" alt="RooMate illustration" width={768} height={512} priority className="w-full" />
          </div>
        </div>
      </section>

      {loggedIn ? (
        <>
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <ZigZagSection title="List Your Property" desc="Reach thousands of verified students and professionals looking for their next home. Get your property approved and live within 24 hours."
                buttonLabel="List a Property" buttonHref="/listings/create" imageSrc="/listProperty.svg" imageAlt="List property" reverse
                steps={[
                  { label: "Fill in basic details — type, BHK, rent and deposit.", icon: <HomeIcon /> },
                  { label: "Add address, amenities, and house rules.", icon: <MapIcon /> },
                  { label: "Upload photos and ownership proof.", icon: <ImageIcon /> },
                  { label: "Submit — verified in 24hrs, then goes live.", icon: <CheckIcon /> },
                ]} />
            </div>
          </section>
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
              <ZigZagSection title="Find Your Perfect Room" desc="Search thousands of verified listings filtered by location, budget, and lifestyle preferences. Find a place that feels like home."
                buttonLabel="Search Properties" buttonHref="/listings" imageSrc="/searchProperty.svg" imageAlt="Search property"
                steps={[
                  { label: "Set your budget, location and preferences.", icon: <SearchIcon /> },
                  { label: "Browse verified listings with photos and details.", icon: <ImageIcon /> },
                  { label: "Message the owner directly from the listing.", icon: <ChatIcon /> },
                ]} />
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <ZigZagSection title="Explore Communities" desc="Join your college or office community. Share listings, ask for recommendations, and connect with people who get your lifestyle."
                buttonLabel="Explore Communities" buttonHref="/communities" imageSrc="/community.svg" imageAlt="Community" reverse
                steps={[
                  { label: "Find your college or office community.", icon: <PeopleIcon /> },
                  { label: "Browse posts — roommate needs, items for sale, recommendations.", icon: <ListIcon /> },
                  { label: "Post and connect with people near you.", icon: <ChatIcon /> },
                ]} />
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Who For */}
          <section id="who-for" className="py-16">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading>Who is RooMate for?</SectionHeading>
              <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
                {[
                  { title: "Property Owners", desc: "List your property and find verified tenants fast.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                  { title: "Students", desc: "Find affordable rooms near your college.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
                  { title: "Working Professionals", desc: "Find flatmates who match your lifestyle.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
                  { title: "Anyone", desc: "Looking for a roommate or a room to rent.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                ].map((item) => (
                  <div key={item.title} className="group rounded-2xl bg-white p-6 shadow-sm border border-[#061b32]/5 text-center transition-all duration-300 hover:shadow-lg hover:border-[#9fdbda] hover:-translate-y-1 cursor-default">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#9fdbda]/20 text-[#061b32] transition-all duration-300 group-hover:bg-[#9fdbda]">{item.icon}</div>
                    <h3 className="mt-4 font-semibold text-[#061b32]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#061b32]/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="py-16">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading>Features</SectionHeading>
              <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
                {[
                  { title: "Verified Listings", desc: "Every property verified by our team within 24 hours.", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg> },
                  { title: "Community", desc: "Join your college or office community and connect.", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { title: "Direct Chat", desc: "Message property owners directly from the listing.", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { title: "Safe & Secure", desc: "Your data and privacy are our top priority.", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                ].map((item) => (
                  <div key={item.title} className="group rounded-2xl bg-[#061b32] p-7 transition-all duration-300 hover:bg-[#9fdbda] hover:shadow-xl hover:-translate-y-1 cursor-default">
                    <div className="text-[#9fdbda] transition-colors duration-300 group-hover:text-[#061b32]">{item.icon}</div>
                    <h3 className="mt-5 font-semibold text-white transition-colors duration-300 group-hover:text-[#061b32]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9fdbda]/70 transition-colors duration-300 group-hover:text-[#061b32]/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section id="how-it-works" className="py-16">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading>How it Works</SectionHeading>
              <div className="mt-12">
                <p className="mb-8 text-base font-bold text-[#061b32]">Sign Up</p>
                <div className="relative grid grid-cols-3 gap-8">
                  <div className="absolute top-5 left-[16%] right-[16%] hidden h-0 border-t-2 border-dashed border-[#9fdbda]/60 md:block" />
                  {[
                    { title: "1. Enter your email", desc: "Provide your email address to get started.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                    { title: "2. Verify your email", desc: "Click the verification link sent to your inbox.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
                    { title: "3. Complete your profile", desc: "Add your username, phone and gender.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                  ].map((item) => (
                    <div key={item.title} className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#9fdbda] shadow-sm">{item.icon}</div>
                      <p className="mt-4 font-semibold text-[#061b32]">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#061b32]/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-14">
                <p className="mb-8 text-base font-bold text-[#061b32]">List a Property</p>
                <div className="relative grid grid-cols-5 gap-4">
                  <div className="absolute top-5 left-[8%] right-[8%] hidden h-0 border-t-2 border-dashed border-[#9fdbda]/60 md:block" />
                  {[
                    { title: "1. Basic details", desc: "Type, BHK, rent and deposit.", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
                    { title: "2. Address", desc: "We pin it on the map for you.", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                    { title: "3. Amenities", desc: "Rules, amenities and hours.", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg> },
                    { title: "4. Photos & Proof", desc: "Upload photos and ownership proof.", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
                    { title: "5. Submit", desc: "Verified in 24hrs, then live.", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
                  ].map((item) => (
                    <div key={item.title} className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#9fdbda] shadow-sm">{item.icon}</div>
                      <p className="mt-4 text-sm font-semibold text-[#061b32]">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#061b32]/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* About Us — always visible */}
      <section id="about" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading>About Us</SectionHeading>
          <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-center">
            <div className="h-52 w-52 shrink-0 rounded-2xl bg-[#9fdbda]/10 flex items-center justify-center text-sm text-[#061b32]/30 border border-[#9fdbda]/20">
              Photo
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-[#061b32]">Hi, I'm Shreya.</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#061b32]/60">
                Finding a place to live should be exciting — not confusing or uncertain. That's the idea behind RooMate. I built it not to be just another property platform, but to create a place where verified properties and a supportive community come together. Whether you're searching for your next home or helping someone else find theirs, I hope RooMate becomes a place you can trust.
              </p>
              <div className="mt-6 flex gap-5">
                <a href="https://www.linkedin.com/in/shreyapgosavi" target="_blank" className="flex items-center gap-2 text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/ShreyaGosavi" target="_blank" className="flex items-center gap-2 text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  GitHub
                </a>
                <a href="mailto:shreya.p.gosavi@gmail.com" className="flex items-center gap-2 text-sm font-medium text-[#061b32] hover:text-[#9fdbda] transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Email
                </a>
              </div>
            </div>
            <div className="hidden md:block w-full max-w-sm">
              <Image src="/aboutUs.svg" alt="About RooMate" width={400} height={400} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#061b32] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* About */}
            <div>
              <p className="text-lg font-bold text-[#9fdbda]">About RooMate</p>
              <div className="mt-2 h-0.5 w-8 bg-[#9fdbda]" />
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                RooMate brings together verified properties and a trusted community to make renting simpler for everyone.
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#9fdbda"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Built to make renting a little easier.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-lg font-bold text-[#9fdbda]">Quick Links</p>
              <div className="mt-2 h-0.5 w-8 bg-[#9fdbda]" />
              <div className="mt-4 space-y-3">
                {[
                  { label: "Browse Properties", href: "/listings", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
                  { label: "Communities", href: "/communities", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
                  { label: "About Us", href: "/#about", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
                  { label: "Contact Us", href: "mailto:shreya.p.gosavi@gmail.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                ].map(l => (
                  <a key={l.label} href={l.href} className="flex items-center gap-2 text-sm text-white/60 hover:text-[#9fdbda] transition-colors">
                    <span className="text-[#9fdbda]">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <p className="text-lg font-bold text-[#9fdbda]">Connect</p>
              <div className="mt-2 h-0.5 w-8 bg-[#9fdbda]" />
              <div className="mt-4 space-y-3">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/in/shreya-gosavi", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  { label: "GitHub", href: "https://github.com/ShreyaGosavi", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
                  { label: "Email Us", href: "mailto:shreya.p.gosavi@gmail.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#9fdbda] transition-colors">
                    <span className="text-[#9fdbda]">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/30">© 2026 RooMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
