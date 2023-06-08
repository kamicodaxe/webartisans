import currency from 'currency.js';

export default function parsePrice(price: string | number) {
  return currency(price).value
}