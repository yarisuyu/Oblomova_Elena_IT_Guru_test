'use client';
import React from "react";
import Image from "next/image";
import Pagination from "../../components/Pagination/Pagination";

export default function ProductTable() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function loadProducts() {
      await fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(items => {
          console.log(items);
          setProducts(items);
        });
    };

    loadProducts();

  }, []);

  console.log();

  return (
    <div className="bg-white w-full p-7">
      <div className="Header flex flex-row justify-between">
        <h4>Все позиции</h4>
        <div className="flex flex-row gap-2">
          <button className="p-2.5 border rounded">
            <Image className="block w-full" width={22} height={22} src="/assets/icons/ArrowsClockwise.png" alt="Обновить"></Image>
          </button>
          <button className="flex flex-row gap-3.5 px-2.5 py-5 rounded-md  bg-blue-700">
            <Image width={22} height={22} src="/assets/icons/PlusCircle.png" alt="Добавить"></Image>
            <div className="text-white text-sm font-semibold">Добавить</div>
          </button>
        </div>
      </div>
      <div className="table">
        <div className="grid grid-cols-7">
          <div className="flex flex-row gap-5">
            <input type="checkbox" name="all-products" id="all-products" />
            <label htmlFor="all-products"><h6>Наименование</h6></label>
          </div>
          <h4>Вендор</h4>
          <h4>Артикул</h4>
          <h4>Оценка</h4>
          <h4>Цена,Р</h4>
          <h4>{""}</h4>
        </div>
        {products && products.products && products.products.map(item => (
          <div key={item.id} className="grid grid-cols-7 border-b-2 border-solid border-gray-400 p-[18px]">
            <div className="flex flex-row gap-4">
              <div key={`${item.id}-check`}>
                <input type="checkbox" name="all-products" id={item.id} />
              </div>
              <div>
                <Image width={48} height={48} className="bg-gray-500 rounded-lg" src={item.thumbnail} alt="Фото"></Image>
              </div>
              <h6 className="" >{item.title}</h6>
            </div>
            <div className="font-bold" >{item.brand}</div>
            <div className="" >{item.sku}</div>
            <div className="" >{item.rating}</div>
            <div className="" >{item.price}</div>
            <div className="flex flex-row align-center gap-8">
              <button className="text-white px-3.5 py-1 rounded-3xl bg-blue-700">
                <Image width={24} height={24} src="/assets/icons/plus.png" alt="Добавить"></Image>
              </button>
              <button className="">
                <Image width={32} height={32} src="/assets/icons/DotsThreeCircle.png" alt="Подробности"></Image>
              </button>
            </div>
          </div>
        ))
        }
      </div>
      <div className="footer flex flex-row justify-between">
        <div className="">Показано 1-20 из 120</div>
        <Pagination />
      </div>
    </div>
  );
}
