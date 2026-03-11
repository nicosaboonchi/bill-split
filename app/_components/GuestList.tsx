type GuestListProps = {
  guests: Record<string, { name: string }>;
  onGuestRemove: (id: string) => void;
};

export function GuestList({ guests, onGuestRemove }: GuestListProps) {
  return (
    <>
      {Object.entries(guests).map(([id, guest]) => (
        <div key={id}>
          {guest.name}
          <button onClick={() => onGuestRemove(id)}>&times;</button>
        </div>
      ))}
    </>
  );
}
