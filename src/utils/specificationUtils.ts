// src/utils/specificationUtils.ts
import { SpecRow } from '../store/specificationsSlice';

export const getSpecTotalRub = (rows: SpecRow[], usdRate: number, eurRate: number): number => {
  let total = 0;
  rows.forEach(row => {
    if (row.type === 'data') {
      const qty = row.quantity || 1;
      if (row.priceRub) {
        total += row.priceRub * qty;
      } else if (row.priceUsd) {
        total += row.priceUsd * usdRate * qty;
      } else if (row.priceEur) {
        total += row.priceEur * eurRate * qty;
      }
    }
  });
  return total;
};
