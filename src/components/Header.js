'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (route) => route === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < lastScrollY || window.scrollY < 10);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    '/work',
    '/about',
    '/services',
    '/ideas',
    '/careers',
    '/contact',
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        visible ? 'bg-orange-500 text-white' : 'opacity-0'
      }`}
    >
      <nav className="flex items-center justify-between p-4">
        <div className="font-bold text-lg">Suitmedia</div>

        {/* 🌐 Desktop Nav */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link} className={isActive(link) ? 'underline font-semibold' : ''}>
              <a href={link} className="hover:opacity-80">
                {link.replace('/', '').toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        {/* 🍔 Mobile Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ☰
        </button>
      </nav>

      {/* 📱 Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col md:hidden px-4 pb-4 gap-2 bg-orange-600 text-white text-sm">
          {navLinks.map((link) => (
            <li key={link} className={isActive(link) ? 'underline font-semibold' : ''}>
              <a href={link} className="block py-1 hover:opacity-80">
                {link.replace('/', '').toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}