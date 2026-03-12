"use client";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddGuest } from "./AddGuest";
import { GuestList } from "./GuestList";
import { AddItem } from "./AddItem";
import { ItemList } from "./ItemList";
import { TaxTip } from "./TaxTip";
import { Guest, Item } from "@/lib/types";

// TODO: Consider refactoring guests and items from objects to arrays
// to preserve insertion order naturally and simplify rendering logic

export function BillForm() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [tax, setTax] = useState("");
  const [tip, setTip] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addGuest = (guest: string) => {
    // create a uuid for this new guest
    setGuests((prev) => [...prev, { id: crypto.randomUUID(), name: guest }]);
  };

  // [{id, name}, {id, name}]
  const removeGuest = (id: string) => {
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const addItem = (itemName: string, price: number) => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        itemName: itemName,
        price: price,
        claimedBy: [],
        createdAt: Date.now(),
      },
    ]);
  };

  // [{id, name, price, guest[]}, {id, name, price, guest[]}]
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  async function handleSubmit() {
    setError("");
    if (guests.length === 0) {
      setError("Please add at least one guest.");
      return;
    }
    if (items.length === 0) {
      setError("Please add at least one item.");
      return;
    }
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "sessions"), {
        guests: guests,
        items: items,
        tax: parseFloat(tax) || 0,
        tip: parseFloat(tip) || 0,
      });
      router.push(`/bill/${docRef.id}`);
    } catch {
      setError("Failed to create bill. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <AddGuest onGuestAdd={addGuest} />
      <GuestList guests={guests} onGuestRemove={removeGuest} />
      <AddItem onItemAdd={addItem} />
      <ItemList items={items} onItemRemove={removeItem} />
      <TaxTip tax={tax} tip={tip} onTaxChange={setTax} onTipChange={setTip} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Bill"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
