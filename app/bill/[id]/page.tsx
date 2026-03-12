"use client";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState, use } from "react";
import { GuestSelector } from "./_components/GuestSelector";
import { ItemSelector } from "./_components/ItemSelector";
import { GuestSummary } from "./_components/GuestSummary";
import { Item, Guest, Bill } from "@/lib/types";

export default function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [guests, setGuests] = useState<Record<string, Guest>>({});
  const [items, setItems] = useState<Record<string, Item>>({});
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "sessions", id), (snapshot) => {
      if (!snapshot.exists()) {
        setLoading(false);
        setError("Bill not found");
        return;
      }

      const { guests, items, tip, tax } = snapshot.data() as Bill;
      setGuests(guests);
      setItems(items);
      setTax(tax);
      setTip(tip);
      setLoading(false);
    });
    return unsubscribe;
  }, [id]);

  const handleClaim = async (itemId: string) => {
    const docRef = doc(db, "sessions", id);
    if (items[itemId].claimedBy.includes(currentUser)) {
      await updateDoc(docRef, {
        [`items.${itemId}.claimedBy`]: arrayRemove(currentUser),
      });
    } else {
      await updateDoc(docRef, {
        [`items.${itemId}.claimedBy`]: arrayUnion(currentUser),
      });
    }
  };

  const sortedItems = Object.entries(items).sort(
    ([, a], [, b]) => a.createdAt - b.createdAt,
  );

  if (loading) {
    return <p>Creating your bill...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!currentUser) {
    return <GuestSelector guests={guests} onGuestSelect={setCurrentUser} />;
  }

  return (
    <main className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex gap-4 justify-center">
        hi {guests[currentUser]?.name}
        <button onClick={() => setCurrentUser("")}>Change user</button>
      </div>
      <ItemSelector
        guests={guests}
        items={sortedItems}
        onItemSelect={handleClaim}
        currentUser={currentUser}
      />
      <GuestSummary
        items={items}
        guests={guests}
        tax={tax}
        tip={tip}
        currentUser={currentUser}
      />
    </main>
  );
}
