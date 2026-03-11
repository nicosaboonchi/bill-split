type GuestSelectorProps = {
  guests: Record<string, { name: string }>;
  onGuestSelect: (id: string) => void;
};

export function GuestSelector({ guests, onGuestSelect }: GuestSelectorProps) {
  return (
    <>
      {Object.entries(guests).map(([id, guest]) => (
        <button key={id} onClick={() => onGuestSelect(id)}>
          <span>{guest.name}</span>
        </button>
      ))}
    </>
  );
}
