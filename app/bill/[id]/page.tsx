"use client";
import { useState } from "react";
import { useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { use } from "react";
import { type Bill } from "@/lib/types";

export default function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [claims, setClaims] = useState<Record<string, string[]>>({});
  const [bill, setBill] = useState<Bill | null>(null);
  const [me, setMe] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "bills", id));
      const data = snap.data() as Bill;
      if (snap.exists()) {
        // normalize: old bills stored claims as strings, new ones as arrays
        const raw = data.claims ?? {};
        const normalized: Record<string, string[]> = {};
        for (const [k, v] of Object.entries(raw)) {
          normalized[k] = Array.isArray(v) ? v : [v as string];
        }
        setClaims(normalized);
        setBill(data);
      }
    };
    load();
  }, [id]);

  const handleClaim = async (idx: number) => {
    if (!me) return;
    const key = String(idx);
    const current = claims[key] ?? [];
    const updated = current.includes(me)
      ? current.filter((p) => p !== me)
      : [...current, me];
    const newClaims = { ...claims };
    if (updated.length === 0) {
      delete newClaims[key];
    } else {
      newClaims[key] = updated;
    }
    setClaims(newClaims);
    await updateDoc(doc(db, "bills", id), { claims: newClaims });
  };

  const getTotals = () => {
    if (!bill) return [];

    const taxRate = bill.tax / 100;
    const tipPerPerson = bill.tip / bill.people.length;

    const subs: Record<string, number> = {};
    bill.people.forEach((person) => (subs[person] = 0));
    bill.items.forEach((item, idx) => {
      const claimers = claims[String(idx)] ?? [];
      if (claimers.length === 0) return;
      const share = item.price / claimers.length;
      claimers.forEach((claimer) => {
        if (claimer in subs) subs[claimer] += share;
      });
    });

    return bill.people.map((person) => {
      const sub = subs[person];
      const tax = sub * taxRate;
      return {
        person,
        sub,
        tax,
        tip: tipPerPerson,
        total: sub + tax + tipPerPerson,
      };
    });
  };

  const totals = getTotals();

  if (!bill) {
    return (
      <main className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="font-mono text-amber-600 tracking-widest">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-dashed border-amber-200 pb-6">
          <h1 className="text-4xl font-bold text-rose-900 tracking-wide font-sans italic">
            The Tab
          </h1>
          <p className="text-xs text-amber-700 tracking-widest uppercase mt-1">
            ✦ Bill Splitter ✦
          </p>
        </div>

        {/* Who are you */}
        {!me ? (
          <section className="mb-6">
            <p className="text-xs tracking-widest uppercase text-amber-600 mb-3">
              — Who are you? —
            </p>
            <div className="flex flex-wrap gap-2">
              {bill.people.map((p) => (
                <button
                  key={p}
                  onClick={() => setMe(p)}
                  className="border-2 border-amber-200 rounded-full px-4 py-2 font-mono text-sm text-stone-700 hover:border-rose-900 hover:text-rose-900 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </section>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <p className="font-mono text-sm text-stone-700">
              Hi <span className="font-bold text-rose-900">{me}</span>! Tap your
              items.
            </p>
            <button
              onClick={() => setMe("")}
              className="font-mono text-xs text-amber-400 hover:text-rose-800"
            >
              Change
            </button>
          </div>
        )}

        <div className="border-t-2 border-dashed border-amber-200 my-4" />

        {/* Items */}
        <section className="mb-6">
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-3">
            — Items —
          </p>
          <div className="space-y-1">
            {bill.items.map((item, idx) => {
              const claimers = claims[String(idx)] ?? [];
              const isMine = claimers.includes(me);
              const isClaimed = claimers.length > 0;
              const myShare = isMine ? item.price / claimers.length : null;
              return (
                <div
                  key={idx}
                  onClick={() => me && handleClaim(idx)}
                  className={`flex items-center gap-3 p-2 rounded transition cursor-pointer
                    ${isMine ? "bg-rose-50" : isClaimed ? "bg-green-50" : "hover:bg-amber-100"}
                    ${!me ? "cursor-default" : ""}
                  `}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs shrink-0
                      ${isMine ? "bg-rose-900 border-rose-900 text-white" : isClaimed ? "bg-green-700 border-green-700 text-white" : "border-amber-300"}
                    `}
                  >
                    {(isMine || isClaimed) && "✓"}
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-sm text-stone-800">
                      {item.name}
                    </span>
                    {isClaimed && (
                      <span className="block font-mono text-xs text-green-700">
                        {claimers.join(", ")}
                        {claimers.length > 1 &&
                          ` · $${(item.price / claimers.length).toFixed(2)} each`}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-mono text-sm font-bold ${isMine ? "text-rose-900" : isClaimed ? "text-green-700" : "text-stone-700"}`}
                  >
                    {myShare !== null
                      ? `$${myShare.toFixed(2)}`
                      : `$${item.price.toFixed(2)}`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3">
            <span
              className={`font-mono text-xs px-2 py-1 rounded-full ${Object.keys(claims).length === bill.items.length ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-600"}`}
            >
              {
                bill.items.filter(
                  (_, i) => (claims[String(i)]?.length ?? 0) > 0,
                ).length
              }
              /{bill.items.length} claimed
            </span>
          </div>
        </section>

        <div className="border-t-2 border-dashed border-amber-200 my-4" />

        {/* Totals */}
        <section className="mb-6">
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-3">
            — Totals —
          </p>
          <div className="space-y-2">
            {totals.map((t) => (
              <div
                key={t.person}
                className={`p-3 rounded border ${t.person === me ? "border-rose-300 bg-rose-50" : "border-amber-200 bg-amber-50"}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-mono text-sm font-bold text-stone-800">
                      {t.person}{" "}
                      {t.person === me && (
                        <span className="text-rose-900">(you)</span>
                      )}
                    </p>
                    <p className="font-mono text-xs text-amber-500 mt-0.5">
                      ${t.sub.toFixed(2)} food
                      {t.tax > 0 && ` + $${t.tax.toFixed(2)} tax`}
                      {t.tip > 0 && ` + $${t.tip.toFixed(2)} tip`}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-lg text-rose-900">
                    ${t.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Share */}
        <div className="bg-amber-100 border border-dashed border-amber-300 rounded p-4 text-center mb-6">
          <p className="font-mono text-xs text-amber-500 uppercase tracking-widest mb-2">
            Share this bill
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="bg-rose-900 text-white font-mono text-xs tracking-widest uppercase px-4 py-2 rounded hover:bg-rose-800 transition"
          >
            Copy Link
          </button>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-dashed border-amber-200 pt-4">
          <p className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            ✦ thank you ✦
          </p>
        </div>
      </div>
    </main>
  );
}
