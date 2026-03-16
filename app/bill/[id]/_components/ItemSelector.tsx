import { Button } from "@/components/ui/Button";
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
    <div className="flex flex-col">
      {items.map((item) => {
        const isClaimed = item.claimedBy.includes(currentUser);
        const claimerNames = item.claimedBy
          .map((guestId) => guests.find((g) => g.id === guestId)?.name)
          .filter(Boolean)
          .join(", ");
        return (
          <Button
            key={item.id}
            onClick={() => onItemSelect(item.id)}
            className={`flex flex-col py-1.5 px-2 text-sm text-left border-b border-dotted border-stone-300 hover:bg-yellow-100 transition-colors ${
              isClaimed ? "bg-yellow-100" : ""
            }`}
          >
            <div className="flex justify-between w-full">
              <span className={isClaimed ? "font-medium" : ""}>
                {isClaimed ? "✓ " : ""}
                {item.itemName}
              </span>
              <span className="text-stone-500">${item.price.toFixed(2)}</span>
            </div>
            {claimerNames && (
              <span className="text-xs text-stone-400">
                claimed by {claimerNames}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
