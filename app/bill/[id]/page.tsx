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

export default function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [guests, setGuests] = useState<Record<string, { name: string }>>({});
  const [items, setItems] = useState<
    Record<
      string,
      {
        itemName: string;
        price: number;
        claimedBy: string[];
        createdAt: number;
      }
    >
  >({});
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "sessions", id), (snapshot) => {
      if (!snapshot.exists()) return;
      const { guests, items, tip, tax } = snapshot.data();
      setGuests(guests);
      setItems(items);
      setTax(tax);
      setTip(tip);
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

  console.log(sortedItems);

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
    </main>
  );
}
