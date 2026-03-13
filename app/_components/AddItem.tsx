import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DollarSign, PlusIcon } from "lucide-react";

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
    <div className=" flex gap-3">
      <Input
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
      />
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <DollarSign className="size-4" />
          <Input
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <Button onClick={handleClick}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
