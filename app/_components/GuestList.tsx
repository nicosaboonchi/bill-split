import { Guest } from "@/lib/types";

type GuestListProps = {
  guests: Guest[];
  onGuestRemove: (id: string) => void;
};

export function GuestList({ guests, onGuestRemove }: GuestListProps) {
  return (
    <>
      {guests.map((guest) => (
        <button key={guest.id} onClick={() => onGuestRemove(guest.id)}>
          <span>{guest.name}</span>
          <span>&times;</span>
        </button>
      ))}
    </>
  );
}
