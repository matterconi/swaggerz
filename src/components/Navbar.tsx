"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, ShoppingBag } from "lucide-react";

interface NavLink { label: string; href: string; }
interface NavbarProps { links?: NavLink[]; cartCount?: number; }

const defaultLinks: NavLink[] = [
  { label: "Men", href: "/#" },
  { label: "Women", href: "/#" },
  { label: "Collections", href: "/#" },
  { label: "Contact", href: "/#" },
];

export default function Navbar({ links = defaultLinks, cartCount = 2 }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);
  
  useEffect(() => { 
    document.body.style.overflow = open ? "hidden" : "unset"; 
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-500/30' 
        : 'bg-transparent'
    }`}>
      <nav className="mx-auto px-6 lg:px-24 flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative">
            <span className="block bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-bold text-2xl tracking-tight group-hover:scale-105 transition-transform duration-300">
              SWAGGERZ
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-500"></div>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-12">
          {links.map((l) => (
            <li key={l.label}>
              <Link 
                href={l.href} 
                className="relative text-light-100 hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:bg-clip-text font-medium tracking-wide transition-all duration-300 group"
              >
                {l.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-500"></div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-light-100 hover:text-yellow-500 transition-colors duration-300 group">
            <Search size={20} className="group-hover:scale-110 transition-transform duration-300" />
          </button>
          <button className="relative text-light-100 hover:text-yellow-500 transition-colors duration-300 group flex items-center gap-2">
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium tracking-wide">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-yellow-500 text-xs font-bold text-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-6 bg-light-100 transition-all duration-300 ease-out ${
              open ? "rotate-45 translate-y-2 bg-gradient-to-r from-red-500 to-yellow-500" : "group-hover:bg-yellow-500"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-light-100 transition-all duration-300 ease-out ${
              open ? "opacity-0" : "group-hover:bg-yellow-500"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-light-100 transition-all duration-300 ease-out ${
              open ? "-rotate-45 -translate-y-2 bg-gradient-to-r from-red-500 to-yellow-500" : "group-hover:bg-yellow-500"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mounted && createPortal(
        <div
          className={`md:hidden fixed inset-0 z-50 bg-dark-900/98 backdrop-blur-lg flex flex-col justify-between transition-all duration-500 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-dark-500/30">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="block bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-bold text-2xl tracking-tight">
                SWAGGERZ
              </span>
            </Link>
            
            <button
              className="relative w-8 h-8 flex flex-col justify-center items-center group"
              onClick={() => setOpen(!open)}
            >
              <span
                className={`absolute block h-0.5 w-6 transition-all duration-300 ${
                  open ? "rotate-45 bg-gradient-to-r from-red-500 to-yellow-500" : "translate-y-[-6px] bg-light-100 group-hover:bg-yellow-500"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 transition-all duration-300 ${
                  open ? "opacity-0" : "bg-light-100 group-hover:bg-yellow-500"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 transition-all duration-300 ${
                  open ? "-rotate-45 bg-gradient-to-r from-red-500 to-yellow-500" : "translate-y-[6px] bg-light-100 group-hover:bg-yellow-500"
                }`}
              />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <ul
              className={`flex flex-col items-center gap-8 transition-all duration-700 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              {links.map((l, index) => (
                <li 
                  key={l.label}
                  className={`transition-all duration-500 ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <Link 
                    href={l.href} 
                    className="text-light-100 hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:bg-clip-text text-3xl font-medium tracking-wide transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`border-t border-dark-500/30 px-6 py-8 flex flex-col gap-6 transition-all duration-700 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button 
              className="flex items-center gap-3 text-light-100 hover:text-yellow-500 transition-colors duration-300 group"
              onClick={() => setOpen(false)}
            >
              <Search size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium tracking-wide">Search</span>
            </button>
            <button 
              className="flex items-center gap-3 text-light-100 hover:text-yellow-500 transition-colors duration-300 group"
              onClick={() => setOpen(false)}
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium tracking-wide">My Cart</span>
              {cartCount > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-yellow-500 text-sm font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}