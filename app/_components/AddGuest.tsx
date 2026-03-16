"use client";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { PlusIcon } from "lucide-react";
import { Input } from "../../components/ui/Input";

type AddGuestProps = {
  onGuestAdd: (name: string) => void;
};

export function AddGuest({ onGuestAdd }: AddGuestProps) {
  const [name, setName] = useState("");

  const handleClick = () => {
    if (name) {
      onGuestAdd(name);
      setName("");
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          placeholder="Guest Name..."
        />

        <Button onClick={handleClick}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
