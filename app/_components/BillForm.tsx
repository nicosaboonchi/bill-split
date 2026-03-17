"use client";
import { AddGuest } from "./AddGuest";
import { GuestList } from "./GuestList";
import { AddItem } from "./AddItem";
import { ItemList } from "./ItemList";
import { TaxTip } from "./TaxTip";
import { useBillForm } from "../_hooks/useBillForm";
import { Button } from "../../components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { BillTotal } from "../bill/[id]/_components/BillTotal";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>- Party -</p>
        <AddGuest onGuestAdd={addGuest} />
        <GuestList guests={guests} onGuestRemove={removeGuest} />
      </div>

      <div className="flex flex-col gap-2">
        <p>- Items -</p>
        <AddItem onItemAdd={addItem} />
        <ItemList items={items} onItemRemove={removeItem} />
      </div>

      <div className="flex flex-col gap-2">
        <p>- Tax & Tip -</p>
        <TaxTip
          tax={tax}
          tip={tip}
          onTaxChange={updateTax}
          onTipChange={updateTip}
        />
      </div>

      <Separator />
      <p>- Total -</p>
      <BillTotal
        items={items}
        tax={parseFloat(tax) || 0}
        tip={parseFloat(tip) || 0}
      />
      <Button
        onClick={handleSubmit}
        disabled={loading || guests.length === 0 || items.length === 0}
      >
        {loading ? "Creating..." : "Create Bill"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
