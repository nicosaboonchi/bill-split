import { useState } from "react";
import { Guest, Item } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function useBillForm() {
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
      },
    ]);
  };

  // [{id, name, price, guest[]}, {id, name, price, guest[]}]
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTax = (value: string) => {
    setTax(value);
  };
  const updateTip = (value: string) => {
    setTip(value);
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

  return {
    addGuest,
    removeGuest,
    addItem,
    removeItem,
    handleSubmit,
    guests,
    items,
    tax,
    tip,
    error,
    loading,
    updateTax,
    updateTip,
  };
}
