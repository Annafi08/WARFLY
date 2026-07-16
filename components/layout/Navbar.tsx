"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Otomatis tutup menu setiap kali pindah halaman
  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsOpen(false);
}, [pathname]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-purple-400 text-black shadow-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <h1 className="text-2xl font-bold">WARFLY</h1>
        </Link>

        <ul className="hidden gap-10 md:flex">
          <li><Link href="/">Beranda</Link></li>
          <li><Link href="/berita">Berita</Link></li>
          <li><Link href="/#TentangKami">Tentang Kami</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/galeri"
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-pink-400 px-5 py-2 font-semibold text-slate-900"
          >
            Galeri
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 md:hidden flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black rounded-full transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black rounded-full transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Dropdown mobile dengan animasi slide + fade */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-1 py-6">
          <li className="w-full text-center">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block py-3 text-gray-800 font-medium hover:bg-purple-50 transition-colors"
            >
              Beranda
            </Link>
          </li>
          <li className="w-full text-center">
            <Link
              href="/berita"
              onClick={() => setIsOpen(false)}
              className="block py-3 text-gray-800 font-medium hover:bg-purple-50 transition-colors"
            >
              Berita
            </Link>
          </li>
          <li className="w-full text-center">
            <Link
              href="/#TentangKami"
              onClick={() => setIsOpen(false)}
              className="block py-3 text-gray-800 font-medium hover:bg-purple-50 transition-colors"
            >
              Tentang Kami
            </Link>
          </li>

          <li className="pt-3">
            <Link
              href="/galeri"
              onClick={() => setIsOpen(false)}
              className="inline-block rounded-full bg-pink-400 hover:bg-pink-500 px-6 py-2.5 font-semibold text-white transition-colors"
            >
              Galeri
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}