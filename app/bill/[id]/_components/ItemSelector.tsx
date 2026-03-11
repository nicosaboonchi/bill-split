type ItemSelectorProps = {
  items: [
    string,
    { itemName: string; price: number; claimedBy: string[]; createdAt: number },
  ][];
  onItemSelect: (id: string) => void;
  guests: Record<string, { name: string }>;
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
      {items.map(([id, item]) => (
        <button
          key={id}
          onClick={() => onItemSelect(id)}
          className={item.claimedBy.includes(currentUser) ? "bg-green-500" : ""}
        >
          <span>
            {item.itemName} - {item.price}
          </span>
          <span>
            claimed by{" "}
            {item.claimedBy.map((guestId) => guests[guestId].name).join(", ")}
          </span>
        </button>
      ))}
    </div>
  );
}
