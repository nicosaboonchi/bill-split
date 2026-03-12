import { Guest } from "@/lib/types";

type GuestSelectorProps = {
  guests: Guest[];
  onGuestSelect: (id: string) => void;
};

export function GuestSelector({ guests, onGuestSelect }: GuestSelectorProps) {
  return (
    <>
      {guests.map((guest) => (
        <button key={guest.id} onClick={() => onGuestSelect(guest.id)}>
          <span>{guest.name}</span>
        </button>
      ))}
    </>
  );
}
