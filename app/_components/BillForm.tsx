"use client";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddGuest } from "./AddGuest";
import { GuestList } from "./GuestList";

export function BillForm() {
  const [guests, setGuests] = useState<Record<string, { name: string }>>({});
  const [items, setItems] = useState<
    Record<string, { itemName: string; price: number; claimedBy: string[] }>
  >({});
  const [tax, setTax] = useState("");
  const [tip, setTip] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addGuest = (guest: string) => {
    // create a uuid for this new guest
    setGuests((prev) => ({ ...prev, [crypto.randomUUID()]: { name: guest } }));
  };

  const removeGuest = (id: string) => {
    setGuests((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const addItem = (itemName: string, price: number) => {
    setItems((prev) => ({
      ...prev,
      [crypto.randomUUID()]: {
        itemName: itemName,
        price: price,
        claimedBy: [],
      },
    }));
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "sessions"), {
        guests: guests,
        items: items,
        tax: tax,
        tip: tip,
      });
      router.push(`/bill/${docRef.id}`);
    } catch (error) {
      setError("Failed to create bill. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AddGuest onGuestAdd={addGuest} />
      <GuestList guests={guests} onGuestRemove={removeGuest} />
    </>
  );
}
