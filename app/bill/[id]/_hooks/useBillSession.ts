import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Guest, Item, Bill } from "@/lib/types";

export function useBillSession(id: string) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);
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

  const handleClaim = async (itemId: Item["id"], currentUser: Guest["id"]) => {
    const docRef = doc(db, "sessions", id);
    const updatedItems = items.map((item) => {
      if (item.id !== itemId) return item;
      const claimedBy = item.claimedBy.includes(currentUser)
        ? item.claimedBy.filter((id) => id !== currentUser)
        : [...item.claimedBy, currentUser];
      return { ...item, claimedBy };
    });
    await updateDoc(docRef, { items: updatedItems });
  };

  return { guests, items, tax, tip, loading, error, handleClaim };
}
