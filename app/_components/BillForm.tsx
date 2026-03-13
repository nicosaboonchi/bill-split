"use client";
import { AddGuest } from "./AddGuest";
import { GuestList } from "./GuestList";
import { AddItem } from "./AddItem";
import { ItemList } from "./ItemList";
import { TaxTip } from "./TaxTip";
import { useBillForm } from "../_hooks/useBillForm";
import { Button } from "../../components/ui/Button";
import { Separator } from "@/components/ui/Separator";
export function BillForm() {
  const {
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
  } = useBillForm();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Separator />
      <p>- Party -</p>
      <AddGuest onGuestAdd={addGuest} />
      <GuestList guests={guests} onGuestRemove={removeGuest} />
      <p>- Items -</p>
      <AddItem onItemAdd={addItem} />
      <ItemList items={items} onItemRemove={removeItem} />
      <p>- Tax & Tip -</p>
      <TaxTip
        tax={tax}
        tip={tip}
        onTaxChange={updateTax}
        onTipChange={updateTip}
      />
      <Separator />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Bill"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
