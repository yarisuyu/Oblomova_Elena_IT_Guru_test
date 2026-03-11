'use client';
import Image from "next/image";
import Button from "../Button/Button";

interface PaginationProps {
  pageCount: number;
  offset?: number;
  setOffset: (offset: number) => void;
}

function Pagination(
  { pageCount, offset = 0, setOffset }: PaginationProps) {

  if (pageCount <= 1) return null;

  const currentPage = "bg-indigo-500 text-white";

  return (
    <div className="flex flex-row gap-2">
      <button disabled={offset < 1} onClick={() => setOffset(offset - 1)}>
        <Image width={20} height={20} src="/assets/icons/CaretLeft.png" alt="Предыдущая страница"></Image>
      </button>
      {Array.from(Array(pageCount).keys()).map(i => (
          <Button
            key={i}
            styles={`${i === offset ? currentPage : ''} w-7.5 h-7.5 rounded`}
            onClick={() => setOffset(i) }
            aria-current={i === offset ? 'page' : undefined}
          >
            {i+1}
          </Button>
        ))
      }
      <button disabled={offset >= pageCount} onClick={() => setOffset(offset + 1)}>
        <Image width={20} height={20} src="/assets/icons/CaretRight.png" alt="Следующая страница"></Image>
      </button>
    </div>
  );
}

export default Pagination;