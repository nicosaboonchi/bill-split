import { Item } from "@/lib/types";

type ItemListProps = {
  items: Item[];
  onItemRemove: (id: string) => void;
};

export function ItemList({ items, onItemRemove }: ItemListProps) {
  return (
    <>
      {items.map((item) => (
        <button key={item.id} onClick={() => onItemRemove(item.id)}>
          <span>
            {item.itemName} - ${item.price.toFixed(2)}
          </span>
          <span>&times;</span>
        </button>
      ))}
    </>
  );
}
