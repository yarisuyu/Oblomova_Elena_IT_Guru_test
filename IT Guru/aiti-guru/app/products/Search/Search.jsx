'use client';
import React from "react";
import Image from "next/image";

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex flex-row gap-2 rounded-lg px-3 py-5 bg-gray-200">
      <Image width={24} height={24} src="/assets/icons/search.png" alt="Поиск"></Image>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Найти"
        className="border-0"
        value={searchQuery}
        onChange={(event) => {
          console.log(event.target.value);
          setSearchQuery(event.target.value);
        }}
      />
    </div>
  );
}
