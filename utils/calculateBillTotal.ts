import { Item } from "@/lib/types";

interface CalculateBillTotalProps {
  items: Item[];
  tax: number;
  tip: number;
}

export function calculateBillTotal({
  items,
  tax,
  tip,
}: CalculateBillTotalProps) {
  const subtotal = items.reduce((total, item) => total + item.price, 0);
  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount + tip;
  return { subtotal, tax: taxAmount, tip, total };
}
