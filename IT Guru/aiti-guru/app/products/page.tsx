'use client';
import Image from "next/image";
import Search from "./Search/Search";
import ProductTable from "./ProductTable/ProductTable";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 font-sans dark:bg-black">
      <main className="flex w-full flex-col bg-yellow-200 dark:bg-black sm:items-start">
        <div className="flex w-full flex-row items-center justify-center p-7 mt-5 mb-7 relative bg-white">
          <div className="absolute left-0 top-0 ml-5">Товары</div>
          <div><Search/></div>
        </div>
        <ProductTable/>

      </main>
    </div>
  );
}
