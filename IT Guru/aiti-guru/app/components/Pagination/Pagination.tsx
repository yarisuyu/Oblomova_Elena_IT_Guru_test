'use client';
import Image from "next/image";
import Button from "../Button/Button";

export default function Pagination(
  { pageCount, offset = 0, setOffset }:
    { pageCount: number, offset: number, setOffset: (offset: number) => void }) {
  const currentPage = "bg-indigo-500 text-white";

  return (
    <div className="flex flex-row gap-2">
      <button disabled={offset < 1} onClick={() => {
        if (offset > 0) {
          setOffset(offset - 1);
        }
      }}>
        <Image src="/assets/icons/CaretLeft.png" alt="Предыдущая страница"></Image>
      </button>
      {Array.from(Array(pageCount).keys()).map(i => (
          <Button
            key={i}
            styles={`${i === offset && currentPage} w-7.5 h-7.5 rounded`}
            onClick={() => setOffset(i) }
          >
            {i+1}
          </Button>
        ))
      }
      <button disabled={offset >= pageCount} onClick={() => {
        if (offset < pageCount) {
          setOffset(offset + 1);
        }
      }}>
        <Image src="/assets/icons/CaretRight.png" alt="Следующая страница"></Image>
      </button>
    </div>
  );
}
