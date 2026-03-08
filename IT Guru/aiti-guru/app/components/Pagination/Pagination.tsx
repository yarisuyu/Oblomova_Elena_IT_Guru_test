'use client';
import Image from "next/image";

export default function Pagination() {
  return (
    <div className="">
      <button>
        <Image src="/assets/icons/CaretLeft.png" alt="Предыдущая страница"></Image>
      </button>
      {
        [1, 2, 3, 4, 5].map(i => (
          <button key={i} className="w-7 h-7 rounded border border-black border-solid">
            {i}
          </button>
        ))
      }
      <button>
        <Image src="/assets/icons/CaretRight.png" alt="Следующая страница"></Image>
      </button>
    </div>
  );
}
