"use client";
import { useState } from "react";

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
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        placeholder="Enter guest name"
      />

      <button onClick={handleClick}>+</button>
    </>
  );
}
