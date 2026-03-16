import { cn } from "@/utils/tailwindMerge";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "border-b w-full border-dashed px-2 py-1 ring-none outline-none font-mono bg-transparent",
        className,
      )}
      placeholder="Input field"
      {...props}
    />
  );
}
