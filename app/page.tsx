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
    <main className="min-h-screen bg-amber-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-dashed border-amber-200 pb-6">
          <h1 className="text-3xl font-bold text-rose-900 tracking-wide">
            The Tab
          </h1>
          <p className="text-xs text-amber-700 tracking-widest uppercase mt-1">
            ✦ Bill Splitter ✦
          </p>
        </div>

        {/* Guests */}
        <section className="mb-6">
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-3">
            — Guests —
          </p>
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm font-mono text-stone-800 placeholder-amber-300 focus:outline-none focus:border-rose-800"
              type="text"
              placeholder="Guest name..."
              value={iName}
              onChange={(e) => setIName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGuest()}
            />
            <button
              className="bg-rose-900 text-white text-sm font-mono px-4 py-2 rounded hover:bg-rose-800 transition"
              onClick={addGuest}
            >
              + Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {people.map((person, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-amber-100 border border-amber-200 rounded-full px-3 py-1 text-sm font-mono text-stone-700"
              >
                {person}
                <button
                  onClick={() =>
                    setPeople((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-amber-400 hover:text-rose-800 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </section>

        <div className="border-t-2 border-dashed border-amber-200 my-4" />

        {/* Items */}
        <section className="mb-6">
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-3">
            — Items —
          </p>
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm font-mono text-stone-800 placeholder-amber-300 focus:outline-none focus:border-rose-800"
              type="text"
              placeholder="Item name..."
              value={iItem}
              onChange={(e) => setIItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <input
              className="w-24 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm font-mono text-stone-800 placeholder-amber-300 focus:outline-none focus:border-rose-800"
              type="number"
              placeholder="$0.00"
              min="0"
              step="0.01"
              value={iPrice}
              onChange={(e) => setIPrice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <button
              className="bg-rose-900 text-white text-sm font-mono px-4 py-2 rounded hover:bg-rose-800 transition"
              onClick={addItem}
            >
              +
            </button>
          </div>
          {items.length > 0 && (
            <div className="space-y-1">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center font-mono text-sm text-stone-700 py-1"
                >
                  <span>{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() =>
                        setItems((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-amber-400 hover:text-rose-800"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="border-t-2 border-dashed border-amber-200 my-4" />

        {/* Tax & Tip */}
        <section className="mb-6">
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-3">
            — Tax & Tip —
          </p>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm font-mono text-stone-800 placeholder-amber-300 focus:outline-none focus:border-rose-800"
              type="number"
              inputMode="decimal"
              placeholder="Tax %"
              min="0"
              step="0.01"
              value={iTax}
              onChange={(e) => setITax(e.target.value)}
            />
            <input
              className="flex-1 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm font-mono text-stone-800 placeholder-amber-300 focus:outline-none focus:border-rose-800"
              type="number"
              inputMode="decimal"
              placeholder="Tip ($)"
              min="0"
              step="0.01"
              value={iTip}
              onChange={(e) => setITip(e.target.value)}
            />
          </div>
        </section>

        {/* Create button */}
        <button
          onClick={createBill}
          disabled={people.length === 0 || items.length === 0}
          className="w-full bg-rose-900 text-white font-mono text-sm tracking-widest uppercase py-3 rounded hover:bg-rose-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ✦ Generate Shareable Bill
        </button>

        {(people.length === 0 || items.length === 0) && (
          <p className="text-center font-mono text-xs text-amber-400 mt-2">
            Add at least one guest and one item to continue
          </p>
        )}

        {/* Footer */}
        <div className="text-center mt-8 border-t-2 border-dashed border-amber-200 pt-4">
          <p className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            ✦ thank you ✦
          </p>
        </div>
      </div>
    </main>
  );
}
