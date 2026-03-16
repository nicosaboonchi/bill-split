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
    <div className="flex flex-col gap-3">
      {guestTabs.map(({ id, subtotal, tax, tip, total }) => {
        const isMe = id === currentUser;
        return (
          <div
            key={id}
            className={`flex flex-col gap-1 text-sm border-b border-dotted border-stone-300 pb-3 ${
              isMe ? "font-medium" : ""
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-stone-500">
              {guests.find((guest) => guest.id === id)?.name}
              {isMe ? " (you)" : ""}
            </p>
            <div className="flex justify-between">
              <span className="text-stone-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tip</span>
              <span>${tip.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
