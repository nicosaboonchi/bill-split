import { Item } from "@/lib/types";
import { calculateBillTotal } from "@/utils/calculateBillTotal";

interface BillTotalProps {
  items: Item[];
  tax: number;
  tip: number;
}

export function BillTotal({ items, tax, tip }: BillTotalProps) {
  const billSummary = calculateBillTotal({ items, tax, tip });

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex justify-between border-b border-dotted border-stone-300 pb-1">
        <span className="text-stone-500">Subtotal</span>
        <span>${billSummary.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-b border-dotted border-stone-300 pb-1">
        <span className="text-stone-500">Tax ({tax}%)</span>
        <span>${billSummary.tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-b border-dotted border-stone-300 pb-1">
        <span className="text-stone-500">Tip</span>
        <span>${billSummary.tip.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold pt-1">
        <span>Total</span>
        <span>${billSummary.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
