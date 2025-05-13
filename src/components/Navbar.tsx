"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-4 absolute top-0 z-50 bg-transparent text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-start">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-wide hover:text-gray-300 transition"
        >
          ColorScramble
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
