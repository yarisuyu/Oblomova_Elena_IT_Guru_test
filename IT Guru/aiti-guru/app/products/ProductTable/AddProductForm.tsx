import React, { useState, useEffect, useRef, ChangeEvent, SubmitEventHandler, FormEvent } from 'react';
// import './AddProductForm.css'; // стили для позиционирования и внешнего вида


// Тип для данных формы
interface FormData {
  name: string;
  price: string;
  vendor: string;
  sku: string;
}

// Тип для toast-уведомления
interface ToastState {
  show: boolean;
  message: string;
}

const AddProductForm = ({positionTop, setIsOpen}: { positionTop: number, setIsOpen: (isOpen: boolean) => void}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    vendor: '',
    sku: ''
  });
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  // Автоматическое скрытие toast через 3 секунды
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();

    // Преобразование цены в число с двумя знаками
    const product = {
      ...formData,
      price: parseFloat(formData.price).toFixed(2)
    };

    console.log('Добавлен товар:', product);
    setToast({ show: true, message: 'Товар успешно добавлен!' });

    // Очистка формы (опционально)
    setFormData({ name: '', price: '', vendor: '', sku: '' });

    // Можно оставить форму открытой или закрыть:
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <form
        ref={formRef}
        className="absolute bg-white border border-gray-300 rounded-lg p-4 shadow-lg w-64 z-1000"
        onSubmit={handleSubmit}
        style={{
          position: 'absolute',
          top: '-12px',
          right: 0
        }}
      >
        <label className="block mb-3 font-medium">
          Наименование:
          <input
            type="text"
            name="name"
            className="w-full p-1.5 mt-1 border border-gray-200 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-3 font-medium">
          Цена (₽):
          <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            className="w-full p-1.5 mt-1 border border-gray-200 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-3 font-medium">
          Вендор:
          <input
            type="text"
            name="vendor"
            className="w-full p-1.5 mt-1 border border-gray-200 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.vendor}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-3 font-medium">
          Артикул:
          <input
            type="text"
            name="sku"
            className="w-full p-1.5 mt-1 border border-gray-200 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-700 text-white rounded border-0 cursor-pointer hover:bg-blue-800 transition">
          Добавить
        </button>
      </form>

      {toast.show && (
        <div className="toast fixed top-5 right-5 bg-gray-800 text-white px-5 py-3 rounded shadow-lg animate-fadeInOut">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AddProductForm;