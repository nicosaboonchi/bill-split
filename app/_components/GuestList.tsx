import { Button } from "@/components/ui/Button";
import { Guest } from "@/lib/types";

type GuestListProps = {
  guests: Guest[];
  onGuestRemove: (id: string) => void;
};

export function GuestList({ guests, onGuestRemove }: GuestListProps) {
  return (
    <>
      {guests.map((guest) => (
        <div
          key={guest.id}
          className="flex justify-between items-center px-2 py-1  text-sm"
        >
          <div>{guest.name}</div>
          <Button variant="item" onClick={() => onGuestRemove(guest.id)}>
            <span>&times;</span>
          </Button>
        </div>
      ))}
    </>
  );
}
