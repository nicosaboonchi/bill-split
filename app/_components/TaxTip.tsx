import { Input } from "@/components/ui/Input";
import { DollarSign, Percent } from "lucide-react";

type TaxTipProps = {
  tax: string;
  tip: string;
  onTaxChange: (value: string) => void;
  onTipChange: (value: string) => void;
};

export function TaxTip({ tax, tip, onTaxChange, onTipChange }: TaxTipProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p>Tax</p>
        <div className="flex items-center gap-2">
          <Input
            value={tax}
            onChange={(e) => onTaxChange(e.target.value)}
            placeholder="0"
            className="w-15 text-right"
          />
          <Percent className="size-4" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>Tip</p>
        <div className="flex items-center gap-2">
          <DollarSign className="size-4" />
          <Input
            value={tip}
            onChange={(e) => onTipChange(e.target.value)}
            placeholder="0.00"
            className="w-15 text-right"
          />
        </div>
      </div>
    </div>
  );
}
