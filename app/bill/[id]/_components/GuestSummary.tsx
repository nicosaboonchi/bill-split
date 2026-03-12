import { Item, Guest } from "@/lib/types";

interface GuestSummaryProps {
  items: Record<string, Item>;
  guests: Record<string, Guest>;
  tax: number;
  tip: number;
}

export function GuestSummary({ items, guests, tax, tip }: GuestSummaryProps) {
  const guestTabs = Object.entries(guests).reduce(
    (acc, [guestId, guest]) => {
      if (!acc[guestId]) {
        acc[guestId] = { subtotal: 0, tax: 0, tip: 0, total: 0 };
      }

      Object.entries(items).forEach(([itemId, item]) => {
        if (item.claimedBy.includes(guestId)) {
          const itemCost = item.price / item.claimedBy.length;
          acc[guestId].subtotal += itemCost;
        }
      });

      acc[guestId].tax = (acc[guestId].subtotal / 100) * tax;
      acc[guestId].tip = tip / Object.keys(guests).length;
      acc[guestId].total =
        acc[guestId].subtotal + acc[guestId].tax + acc[guestId].tip;

      return acc;
    },
    {} as Record<
      string,
      { subtotal: number; tax: number; tip: number; total: number }
    >,
  );

  return (
    <div className="rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Guest Summary</h2>
      <div className="space-y-4">
        {Object.entries(guestTabs).map(([guestId, summary]) => (
          <div key={guestId} className="border p-3 rounded">
            <h3 className="text-lg font-semibold">{guests[guestId].name}</h3>
            <p>Subtotal: ${summary.subtotal.toFixed(2)}</p>
            <p>Tax: ${summary.tax.toFixed(2)}</p>
            <p>Tip: ${summary.tip.toFixed(2)}</p>
            <p className="font-bold">Total: ${summary.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
