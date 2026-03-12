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
    <div className="rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Bill Total</h2>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${billSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({tax}%)</span>
          <span>${billSummary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tip</span>
          <span>${billSummary.tip.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>${billSummary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
