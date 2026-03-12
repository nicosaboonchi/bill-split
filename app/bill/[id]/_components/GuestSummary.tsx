import { Item, Guest } from "@/lib/types";
import { calculateGuestTabs } from "@/utils/calculateGuestTabs";

interface GuestSummaryProps {
  items: Item[];
  guests: Guest[];
  tax: number;
  tip: number;
  currentUser: string;
}

export function GuestSummary({
  items,
  guests,
  tax,
  tip,
  currentUser,
}: GuestSummaryProps) {
  const guestTabs = calculateGuestTabs({ items, guests, tax, tip });

  return (
    <div className="rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Guest Summary</h2>
      <div className="space-y-4">
        {guestTabs.map(({ id, subtotal, tax, tip, total }) => (
          <div
            key={id}
            className={`border p-3 rounded ${id === currentUser ? "bg-green-500" : ""}`}
          >
            <h3 className="text-lg font-semibold">
              {guests.find((guest) => guest.id === id)?.name}
            </h3>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Tip: ${tip.toFixed(2)}</p>
            <p className="font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
