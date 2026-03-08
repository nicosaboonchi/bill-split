"use client";

import { useState } from "react";
import { handleCreate } from "@/actions/handleCreate";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Home() {
  const [iName, setIName] = useState("");
  const [people, setPeople] = useState<string[]>([]);
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);
  const [iItem, setIItem] = useState("");
  const [iPrice, setIPrice] = useState("");
  const [iTax, setITax] = useState("");
  const [iTip, setITip] = useState("");

  const router = useRouter(); // Initialize Router for navigation

  const addGuest = () => {
    const name = iName.trim();
    if (name && !people.includes(name)) {
      setPeople([...people, name]);
      setIName("");
    }
  };

  const addItem = () => {
    const name = iItem.trim();
    const price = parseFloat(iPrice);
    if (name && !isNaN(price) && price > 0) {
      setItems([...items, { name, price }]);
      setIItem("");
      setIPrice("");
    }
  };

  const createBill = async () => {
    if (people.length === 0 || items.length === 0) {
      alert("Please add at least one guest and one item.");
      return;
    }

    const billId = await handleCreate({
      people,
      items,
      tax: iTax,
      tip: iTip,
    });
    router.push(`/bill/${billId}`); // Redirect to the bill page after creation
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1>Guests</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter guest name"
          value={iName}
          onChange={(e) => setIName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGuest()}
        />
        <button onClick={addGuest}>Add Guest</button>
      </div>
      <div>
        {people.map((person, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setPeople((prev) => prev.filter((_, i) => i !== index))
              }
            >
              {person} x
            </button>
          </div>
        ))}
      </div>

      {/* Items */}
      <h1>Items</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter item name"
          value={iItem}
          onChange={(e) => setIItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter item price"
          value={iPrice}
          onChange={(e) => setIPrice(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setItems((prev) => prev.filter((_, i) => i !== index))
              }
            >
              {item.name} - ${item.price.toFixed(2)} x
            </button>
          </div>
        ))}
      </div>

      {/* Tax and tip */}
      <h1>Tax and Tip</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          inputMode="decimal"
          placeholder="Enter Tax %"
          value={iTax}
          onChange={(e) => setITax(e.target.value)}
        />
        <input
          type="number"
          inputMode="decimal"
          placeholder="Enter Tip Amnt"
          value={iTip}
          onChange={(e) => setITip(e.target.value)}
        />
      </div>
      <button onClick={createBill}>Create Bill</button>
    </main>
  );
}
