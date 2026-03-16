import { Item } from "@/lib/types";
import { RemovableRow } from "@/components/ui/RemovableRow";

type ItemListProps = {
  items: Item[];
  onItemRemove: (id: string) => void;
};

export function ItemList({ items, onItemRemove }: ItemListProps) {
  return (
    <div>
      {items.length === 0 && (
        <p className="text-sm text-stone-400 text-center">
          No items added yet.
        </p>
      )}
      {items.map((item) => (
        <RemovableRow key={item.id} onRemove={() => onItemRemove(item.id)}>
          <span>{item.itemName}</span>
          <span>${item.price.toFixed(2)}</span>
        </RemovableRow>
      ))}
    </div>
  );
}
