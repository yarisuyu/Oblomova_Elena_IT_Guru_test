export function formatPrice(price: number) {
    const priceStr = price.toString();
    const [integerPart, fractionalPart] = priceStr.split('.');

    // Форматируем целую часть: вставляем пробелы между группами цифр (по 3 справа)
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Если есть дробная часть (не пустая строка)
    if (fractionalPart !== undefined && fractionalPart !== '') {
    } else {
    }

  return [formattedInteger, fractionalPart];
}