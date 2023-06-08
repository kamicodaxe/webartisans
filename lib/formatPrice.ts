import currency from 'currency.js';

export default function formatPrice(value: string | number) {
  return currency(value, {
    separator: ' ',
    decimal: ',',
    precision: 0,
    symbol: 'FCFA',
    pattern: '# !'
  }).format()
}