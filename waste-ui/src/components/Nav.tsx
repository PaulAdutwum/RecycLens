"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#scanner", label: "Scanner" },
  { href: "#dashboard", label: "Analytics" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#categories", label: "Categories" },
  { href: "#roadmap", label: "The Vision" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg-primary/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-18 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-lg tracking-tight">
          RecycLens
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#scanner"
          className="hidden md:inline-flex items-center rounded-full bg-accent-primary text-bg-primary font-semibold text-sm px-5 py-2.5 hover:brightness-110 transition"
        >
          Try It Now
        </a>

        <button
          className="md:hidden p-2 text-text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-bg-primary border-b border-white/5">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-text-secondary hover:text-text-primary text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#scanner"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center rounded-full bg-accent-primary text-bg-primary font-semibold text-sm px-5 py-2.5"
          >
            Try It Now
          </a>
        </div>
      )}
    </header>
  );
}
