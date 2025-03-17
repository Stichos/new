'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletConnect } from '@/components/WalletConnect';

interface HeaderProps {
  setIsConnected?: (connected: boolean) => void;
}

export function Header({ setIsConnected }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-[#08080D]/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <header className="bg-[#13161B] rounded-[20px] px-4 py-2 flex justify-between items-center mb-8 border border-[#23262E]">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl text-[#62e88b] mr-6">zNode<span></span></Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-[#62e88b] transition-colors">Dashboard</Link>
              <Link href="/claim" className="text-white hover:text-[#62e88b] transition-colors">Claim</Link>
              <Link href="/licenses" className="text-white hover:text-[#62e88b] transition-colors">Licenses</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <WalletConnect onConnect={(connected) => {
              if (setIsConnected) setIsConnected(connected);
            }} />

            <button
  className="md:hidden text-white"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {isMobileMenuOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </>
    )}
  </svg>
  <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
</button>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#13161B] rounded-[20px] mt-2 p-4 border border-[#23262E]">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-[#62e88b] transition-colors">Dashboard</Link>
              <Link href="/claim" className="text-white hover:text-[#62e88b] transition-colors">Claim</Link>
              <Link href="/licenses" className="text-white hover:text-[#62e88b] transition-colors">Licenses</Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
