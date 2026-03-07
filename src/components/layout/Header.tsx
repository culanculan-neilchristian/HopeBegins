'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import headerLogo from '@/assets/images/header-logo.png';
import { Home, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/be-carrier', label: 'I Want to Be a Hope Carrier' },
    { href: '/give-hope', label: 'I Want to Give Hope' },
    { href: '/our-story', label: 'Our Story' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Navigation */}
      <nav className="bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={headerLogo}
                alt="HopeBegins Logo"
                width={170}
                height={62}
                style={{ height: 'auto' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-poppins uppercase tracking-wider"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 py-6 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-poppins uppercase tracking-wider py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
