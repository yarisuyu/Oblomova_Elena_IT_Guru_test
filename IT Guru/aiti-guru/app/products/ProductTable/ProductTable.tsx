'use client';
import React from "react";
import Image from "next/image";
import Pagination from "../../components/Pagination/Pagination";
import { CATEGORIES } from "../../helpers/categories";
import { formatPrice } from "@/app/helpers/helpers";
import StyledCheckbox from "@/app/components/StyledCheckbox/StyledCheckbox";
import AddProductForm from "./AddProductForm";
import Button from "@/app/components/Button/Button";

const PAGE_SIZE = 20;
const DATA_HOST = 'https://dummyjson.com/products';

function getPageCount(total: number, pageSize = PAGE_SIZE) {
  return Math.ceil(total / pageSize);
}

// Тип для позиции формы
interface Position {
  top: number;
}

export default function ProductTable({searchQuery}: {searchQuery: string}) {
  const [products, setProducts] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [productCount, setProductCount] = React.useState(0);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggleForm = () => setIsOpen(prev => !prev);

  const getProductId = (id: number) => `product${id}`;

  function isChecked(productId: string) {
    const selected = selectedProducts.filter(id => id == productId);
    if (selected.length > 0)
      return true;
    return false;
  }

  function areAllChecked() {
    return selectedProducts.length === products.length && products.length > 0;
  }

  function changeIsChecked(productId: string) {
    let newSelectedProducts = [];
    if (isChecked(productId)) {
      newSelectedProducts = selectedProducts.filter(id => id != productId);
    } else {
      newSelectedProducts = [...selectedProducts, productId];
    }

    setSelectedProducts(newSelectedProducts as never[]);
  }

  function changeAllIsChecked() {
    if (selectedProducts.length > 0) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts([...products.map(p => getProductId((p as Product).id))] as never[]);
    }
  }

  //fetch('https://dummyjson.com/products/search?q=phone')
  //fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
  //fetch('https://dummyjson.com/products/categories')
  //fetch('https://dummyjson.com/products/category-list')
  //fetch('https://dummyjson.com/products/category/smartphones')
  React.useEffect(() => {
    async function loadProducts() {
      const queryString = searchQuery ? `/search?q=${searchQuery}&` : '?';
      const limitConstraints = `limit=${PAGE_SIZE}&skip=${offset * PAGE_SIZE}`;
      const url = `${DATA_HOST}${queryString}${limitConstraints}`;

      await fetch(url)
        .then(res => res.json())
        .then(items => {
          if (!items || !items.products) {
            return;
          }
          setProducts(items.products);
          setProductCount(items.total);
        });
    };

    loadProducts();

  }, [offset, searchQuery]);

  return (
    <div className="flex flex-col gap-10 bg-white w-full p-7 ">
      <div className="Header flex flex-row justify-between">
        <h4 className="font-bold text-xl">Все позиции</h4>
        <div className="flex flex-row gap-2">
          <Button styles="w-10.5 h-10.5 p-2.5 border rounded">
            <Image className="block w-full" width={22} height={22} src="/assets/icons/ArrowsClockwise.png" alt="Обновить"></Image>
          </Button>
          <Button
            primary
            styles="flex flex-row gap-3.5 px-5 py-2.5 rounded-md"
            onClick={toggleForm}
          >
            {!isOpen && <Image width={22} height={22} src="/assets/icons/PlusCircle.png" alt="Добавить"></Image>}
            <div className="text-sm">{isOpen ? "Закрыть" : "Добавить"}</div>
          </Button>
        </div>
      </div>
      {isOpen && <AddProductForm setIsOpen={setIsOpen} />}

      <div className="table">
        <div className="px-4 py-6">
          <div className="grid gap-7 grid-flow-row grid-cols-[320px_3fr_3fr_2fr_2fr_2fr] font-bold text-gray-500 border-b border-solid border-gray-400">
            <StyledCheckbox name="all-products" checked={areAllChecked()} onChange={changeAllIsChecked} styles="h-5.5 w-5.5 rounded border border-gray-400 border-solid">
              <h6 className="ml-10">Наименование</h6>
            </StyledCheckbox>

            <h4 className="text-align">Вендор</h4>
            <h4 className="text-align">Артикул</h4>
            <h4 className="text-align">Оценка</h4>
            <h4 className="text-align">Цена, &#8381;</h4>
            <h4>{""}</h4>
            </div>
          </div>
        {products && products.map(product => {
          const item = product as Product;
          const [priceFormatted, priceFractionalPart] = formatPrice(item.price);
          const productId = getProductId(item.id);
          return (
            <div key={item.id} className="grid gap-7 items-center grid-cols-[320px_3fr_3fr_2fr_2fr_2fr] border-b-2 border-solid border-gray-400 p-4.5">
              <StyledCheckbox
                key={`${item.id}-check`}
                name={productId}
                checked={isChecked(productId)}
                onChange={() => changeIsChecked(productId)}
                styles="top-3 h-5.5 w-5.5 rounded border border-gray-400 border-solid"
              >
                <div className="flex flex-row items-center gap-4.5">
                  <div className="ml-10">
                    <Image width={48} height={48} className="bg-gray-500 rounded-lg" src={item.thumbnail} alt="Фото"></Image>
                  </div>
                  <div className="">
                    <h6 className="max-w-45 text-nowrap overflow-hidden text-ellipsis" >{item.title}</h6>
                    <p className="text-gray-600">{CATEGORIES[item.category]}</p>
                  </div>
                </div>
              </StyledCheckbox>

              <div className="font-bold text-align" >{item.brand}</div>
              <div className="text-align" >{item.sku}</div>
              <div className="text-align" ><span className={`${item.rating < 3 && "text-red-400"}`}>{item.rating}</span>/5</div>
              <div className="text-align" >
                {priceFormatted}
                <span className="text-gray-400">, {priceFractionalPart}</span>
              </div>
              <div className="flex flex-row items-center gap-8">
                <Button primary styles="px-3.5 py-1 rounded-[27px]">
                  <div>
                    <Image width={24} height={24} src="/assets/icons/plus.png" alt="Добавить"></Image>
                  </div>
                </Button>
                <Button styles="border-0">
                  <Image
                    width={32}
                    height={32}
                    src="/assets/icons/DotsThreeCircle.png"
                    alt="Подробности"
                    title="Подробности">
                  </Image>
                </Button>
              </div>
            </div>
          );
        })
        }
      </div>

      <div className="flex flex-row justify-between">
        <div className="">
          Показано <span className="font-semibold">{offset * PAGE_SIZE + 1}-{(offset + 1) * PAGE_SIZE}</span>
          {' '}из <span className="font-semibold">{productCount}</span>
        </div>
        <Pagination pageCount={getPageCount(productCount)} offset={offset} setOffset={setOffset} />
      </div>
    </div>
  );
}

//{"id":134,"title":"Vivo S1","description":"The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.","category":"smartphones","price":249.99,"discountPercentage":10.17,"rating":3.5,"stock":50,"tags":["smartphones","vivo"],
interface Product {
  id: number,
  title: string,
  category: string,
  thumbnail: string,
  brand: string,
  sku: string,
  rating: number,
  price: number
};