"use client";
import { useState, use } from "react";
import { GuestSelector } from "./_components/GuestSelector";
import { ItemSelector } from "./_components/ItemSelector";
import { GuestSummary } from "./_components/GuestSummary";
import { BillTotal } from "./_components/BillTotal";
import { useBillSession } from "./_hooks/useBillSession";
import { ShareBill } from "./_components/ShareBill";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/Separator";

export default function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [currentUser, setCurrentUser] = useState("");
  const { guests, items, tax, tip, loading, error, handleClaim } =
    useBillSession(id);

  const currentGuestName = guests.find(
    (guest) => guest.id === currentUser,
  )?.name;

  if (loading) {
    return (
      <main className="max-w-lg px-4 py-8 mx-auto">
        <div className="bg-yellow-50 px-6 py-8 flex flex-col gap-4">
          <Header />
          <Separator />
          <p className="text-center text-sm text-stone-400">
            Loading your bill...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-lg px-4 py-8 mx-auto">
        <div className="bg-yellow-50 px-6 py-8 flex flex-col gap-4">
          <Header />
          <Separator />
          <p className="text-center text-sm text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="max-w-lg px-4 py-8 mx-auto">
        <div className="bg-yellow-50 px-6 py-8 flex flex-col gap-4">
          <Header />
          <Separator />
          <p className="text-xs tracking-wide text-stone-400 uppercase text-center">
            - Who are you? -
          </p>
          <GuestSelector guests={guests} onGuestSelect={setCurrentUser} />
          <span className="flex justify-center items-center">
            ✦ Thank you ✦
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-lg px-4 py-8 mx-auto">
      <div className="bg-yellow-50 px-6 py-8 flex flex-col gap-4">
        <Header />
        <Separator />
        <div className="flex justify-between items-center text-sm">
          <span>
            Hi, <strong>{currentGuestName}</strong>!
          </span>
          <button
            onClick={() => setCurrentUser("")}
            className="text-xs text-stone-400 underline hover:text-stone-600"
          >
            change user
          </button>
        </div>
        <Separator />
        <p className="text-xs tracking-wide text-stone-400 uppercase">
          - Items -
        </p>
        <ItemSelector
          guests={guests}
          items={items}
          onItemSelect={(itemId) => handleClaim(itemId, currentUser)}
          currentUser={currentUser}
        />
        <Separator />
        <p className="text-xs tracking-wide text-stone-400 uppercase">
          - Guest Tabs -
        </p>
        <GuestSummary
          items={items}
          guests={guests}
          tax={tax}
          tip={tip}
          currentUser={currentUser}
        />
        <Separator />
        <p className="text-xs tracking-wide text-stone-400 uppercase">
          - Bill Total -
        </p>
        <BillTotal items={items} tax={tax} tip={tip} />
        <ShareBill />
        <span className="flex justify-center items-center">✦ Thank you ✦</span>
      </div>
    </main>
  );
}
