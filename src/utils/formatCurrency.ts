export function formatCryptoMarketCap(
  value: number,
  decimals: number = 2,
): string {
  if (value === 0 || !value) return "$0";

  // 1. Jika angka menyentuh atau lebih dari 1 Triliun (10^12)
  if (value >= 1_000_000_000_000) {
    const abbreviatedValue = value / 1_000_000_000_000;
    return `$${abbreviatedValue.toFixed(decimals).replace(".", ",")} Triliun`;
  }

  // 2. Jika angka menyentuh atau lebih dari 1 Miliar / Billion (10^9)
  if (value >= 1_000_000_000) {
    const abbreviatedValue = value / 1_000_000_000;
    return `$${abbreviatedValue.toFixed(decimals).replace(".", ",")} Miliar`;
  }

  // 3. Jika angka menyentuh atau lebih dari 1 Juta (10^6)
  if (value >= 1_000_000) {
    const abbreviatedValue = value / 1_000_000;
    return `$${abbreviatedValue.toFixed(decimals).replace(".", ",")} Juta`;
  }

  // 4. Jika angka biasa di bawah 1 Juta, format dengan pemisah ribuan standar
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
  }).format(value);
}
