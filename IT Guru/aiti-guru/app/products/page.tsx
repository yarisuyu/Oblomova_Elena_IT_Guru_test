'use client';
import Search from "./Search/Search";
import ProductTable from "./ProductTable/ProductTable";
import { Geist } from 'next/font/google'
import React from "react";

const geist = Geist({
  subsets: ['latin'],
})

export default function Home() {
  const [query, setQuery] = React.useState('');
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-col gap-7 w-full bg-gray-800 py-5 dark:bg-black sm:items-start">
        <nav className="flex w-full flex-row items-center justify-center p-7 relative bg-white">
          <div className="absolute left-0 top-1/3 ml-5 py-auto font-bold text-2xl">Товары</div>
          <div><Search searchQuery={query} setSearchQuery={setQuery} /></div>
        </nav>
        <ProductTable searchQuery={query} />
      </main>
    </div>
  );
}
