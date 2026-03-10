'use client';
import React from "react";
import Image from "next/image";

export default function Search({ searchQuery, setSearchQuery }) {
  const [query, setQuery] = React.useState(searchQuery);
  return (
    <form onSubmit={() => { setSearchQuery(query) }} className="w-1/2 flex flex-row gap-2 rounded-lg px-3 py-5 cursor-text bg-gray-950">
      <Image width={24} height={24} src="/assets/icons/search.png" alt="Поиск"></Image>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Найти"
        className="border-0"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </form>
  );
}
