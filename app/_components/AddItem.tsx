import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "@/components/ui/Input";

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
      <Input
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
      />
      <Input
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="$0.00"
      />
      <Button onClick={handleClick}>+</Button>
    </div>
  );
}
