import { Item, Guest } from "@/lib/types";

interface calculateGuestTabs {
  items: Item[];
  guests: Guest[];
  tax: number;
  tip: number;
}

export function calculateGuestTabs({
  items,
  guests,
  tax,
  tip,
}: calculateGuestTabs) {
  // Calculate subtotals
  const subtotals = items.reduce(
    (acc, item) => {
      if (item.claimedBy.length === 0) return acc;
      const share = item.price / item.claimedBy.length;
      item.claimedBy.forEach((guest) => {
        acc[guest] = (acc[guest] ?? 0) + share;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  //   calculate tax and tip shares
  const guestTabs = guests.map((guest) => {
    const tipSplit = tip / guests.length;
    const subtotal = subtotals[guest.id] ?? 0;
    const taxAmnt = subtotal * (tax / 100);
    const total = subtotal + taxAmnt + tipSplit;

    return { id: guest.id, subtotal, tax: taxAmnt, tip: tipSplit, total };
  });

  return guestTabs;
}
