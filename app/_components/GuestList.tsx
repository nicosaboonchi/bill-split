import { Guest } from "@/lib/types";
import { RemovableRow } from "@/components/ui/RemovableRow";

type GuestListProps = {
  guests: Guest[];
  onGuestRemove: (id: string) => void;
};

export function GuestList({ guests, onGuestRemove }: GuestListProps) {
  return (
    <div>
      {guests.length === 0 && (
        <p className="text-sm text-stone-400 text-center">
          No guests added yet.
        </p>
      )}
      {guests.map((guest, index) => (
        <RemovableRow key={guest.id} onRemove={() => onGuestRemove(guest.id)}>
          <span className="text-stone-400">
            {String(index + 1).padStart(2, "0")}.
          </span>
          <span>{guest.name}</span>
        </RemovableRow>
      ))}
    </div>
  );
}
