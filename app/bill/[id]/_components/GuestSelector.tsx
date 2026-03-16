import { Guest } from "@/lib/types";

type GuestSelectorProps = {
  guests: Guest[];
  onGuestSelect: (id: string) => void;
};

export function GuestSelector({ guests, onGuestSelect }: GuestSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {guests.map((guest) => (
        <button
          key={guest.id}
          onClick={() => onGuestSelect(guest.id)}
          className="border border-dashed py-2 px-4 text-sm hover:bg-rose-900/20 transition-colors text-left"
        >
          {guest.name}
        </button>
      ))}
    </div>
  );
}
