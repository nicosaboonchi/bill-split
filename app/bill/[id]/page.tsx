"use client";
import { useState, use } from "react";
import { GuestSelector } from "./_components/GuestSelector";
import { ItemSelector } from "./_components/ItemSelector";
import { GuestSummary } from "./_components/GuestSummary";
import { BillTotal } from "./_components/BillTotal";
import { useBillSession } from "./_hooks/useBillSession";
import { ShareBill } from "./_components/ShareBill";

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
        hi {currentGuestName}!&nbsp;
        <button onClick={() => setCurrentUser("")}>Change user</button>
      </div>
      <ItemSelector
        guests={guests}
        items={items}
        onItemSelect={(itemId) => handleClaim(itemId, currentUser)}
        currentUser={currentUser}
      />
      <GuestSummary
        items={items}
        guests={guests}
        tax={tax}
        tip={tip}
        currentUser={currentUser}
      />
      <BillTotal items={items} tax={tax} tip={tip} />
      <ShareBill />
    </main>
  );
}
