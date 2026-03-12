import { Guest, Item } from "@/lib/types";

type ItemSelectorProps = {
  items: Item[];
  onItemSelect: (id: string) => void;
  guests: Guest[];
  currentUser: string;
};

export function ItemSelector({
  items,
  onItemSelect,
  guests,
  currentUser,
}: ItemSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemSelect(item.id)}
          className={item.claimedBy.includes(currentUser) ? "bg-green-500" : ""}
        >
          <span>
            {item.itemName} - {item.price}
          </span>
          <span>
            claimed by{" "}
            {item.claimedBy
              .map(
                (guestId) => guests.find((guest) => guest.id === guestId)?.name,
              )
              .join(", ")}
          </span>
        </button>
      ))}
    </div>
  );
}
