type GuestListProps = {
  guests: Record<string, { name: string }>;
  onGuestRemove: (id: string) => void;
};

export function GuestList({ guests, onGuestRemove }: GuestListProps) {
  return (
    <>
      {Object.entries(guests).map(([id, guest]) => (
        <button key={id} onClick={() => onGuestRemove(id)}>
          <span>{guest.name}</span>
          <span>&times;</span>
        </button>
      ))}
    </>
  );
}
