"use client";
import { useState } from "react";
import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { use } from "react";
import { type Bill } from "@/lib/types";

export default function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [claims, setClaims] = useState<Record<string, string>>({});
  const [bill, setBill] = useState<Bill | null>(null);
  const [me, setMe] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "bills", id));
      const data = snap.data() as Bill;
      if (snap.exists()) {
        setClaims(data.claims);
        setBill(data);
      }
    };
    load();
  }, [id]);

  const handleClaim = (idx: number) => {
    if (!me) return;
    const currentlyClaimed = { ...claims };
    if (currentlyClaimed[idx] === me) {
      delete currentlyClaimed[idx];
    } else {
      currentlyClaimed[idx] = me;
    }
    setClaims(currentlyClaimed);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1>Who are you?</h1>
      {bill?.people.map((p) => (
        <button
          key={p}
          onClick={() => setMe(p)}
          className={me === p ? "font-bold" : ""}
        >
          {p}
        </button>
      ))}

      <h1>Items</h1>
      {bill?.items.map((i, idx) => (
        <div key={i.name}>
          {i.name} - ${i.price} - claimed by {claims[idx] || "nobody"}
          <button onClick={() => handleClaim(idx)}>Claim</button>
        </div>
      ))}
      <h2 className="mt-6 mb-2 font-bold">Claims (debug)</h2>
      <pre className="bg-gray-600 p-3 rounded text-sm overflow-auto">
        {JSON.stringify(claims, null, 2)}
      </pre>
    </main>
  );
}
