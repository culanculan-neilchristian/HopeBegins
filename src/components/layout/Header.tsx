'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import headerLogo from '@/assets/images/header-logo.png';
import { Home, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/be-carrier', label: 'I Want to Be a Hope Carrier' },
    { href: '/give-hope', label: 'Our Impact' },
    { href: '/our-story', label: 'Our Story' },
  ];

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;

    event.preventDefault();
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Navigation */}
      <nav
        className={cn(
          'transition-all duration-300 border-b',
          hasScrolled || isMenuOpen
            ? 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-md shadow-zinc-900/5'
            : 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/40 dark:border-zinc-900/40'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={handleHomeClick}
            >
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
                onClick={link.href === '/' ? handleHomeClick : undefined}
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
                  onClick={
                    link.href === '/'
                      ? handleHomeClick
                      : () => setIsMenuOpen(false)
                  }
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
