import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

type RemovableRowProps = {
  onRemove: () => void;
  children: React.ReactNode;
};

export function RemovableRow({ onRemove, children }: RemovableRowProps) {
  return (
    <div className="flex justify-between items-center py-1 text-sm border-b border-dotted border-stone-300">
      <div className="flex gap-2">{children}</div>
      <Button
        onClick={onRemove}
        className="bg-transparent size-8 flex items-center justify-center cursor-pointer"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
