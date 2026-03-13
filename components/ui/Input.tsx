export function Input({ ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className="border-b w-full border-dashed px-2 py-1"
      placeholder="Input field"
      {...props}
    />
  );
}
