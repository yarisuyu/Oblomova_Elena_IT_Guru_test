'use client';
import Image from "next/image";
import Search from "./Search/Search";
import ProductTable from "./ProductTable/ProductTable";
import { Geist } from 'next/font/google'
import React from "react";

const geist = Geist({
  subsets: ['latin'],
})

export default function Products() {
  const [query, setQuery] = React.useState('');

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-col gap-7 w-full bg-gray-800 py-5 dark:bg-black sm:items-start">
        <nav className="flex w-full flex-row items-center justify-center p-7 relative bg-white">
          <div className="absolute left-0 top-1/3 ml-5 py-auto font-bold text-2xl">Товары</div>
          <form onSubmit={() => setQuery(query)} className="search-form w-1/2 flex flex-row gap-2 rounded-lg px-3 py-5 cursor-text bg-gray-950">
            <Image width={24} height={24} src="/assets/icons/search.png" alt="Поиск"></Image>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Найти"
              className="border-0 focus:outline-0"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </form>
        </nav>
        <ProductTable searchQuery={query} />
      </main>
    </div>
  );
}
