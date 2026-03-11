type ItemListProps = {
  items: Record<string, { itemName: string; price: number }>;
  onItemRemove: (id: string) => void;
};

export function ItemList({ items, onItemRemove }: ItemListProps) {
  return (
    <>
      {Object.entries(items).map(([id, { itemName, price }]) => (
        <button key={id} onClick={() => onItemRemove(id)}>
          <span>
            {itemName} - ${price.toFixed(2)}
          </span>
          <span>&times;</span>
        </button>
      ))}
    </>
  );
}
