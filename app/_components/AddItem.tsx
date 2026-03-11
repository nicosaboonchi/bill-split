import { useState } from "react";

type AddItemProps = {
  onItemAdd: (itemName: string, price: number) => void;
};

export function AddItem({ onItemAdd }: AddItemProps) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = () => {
    if (!itemName.trim() || !price) return;
    onItemAdd(itemName, parseFloat(price));
    setItemName("");
    setPrice("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
      />
      <input
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="$0.00"
        className="w-24"
      />
      <button onClick={handleClick}>+</button>
    </div>
  );
}
