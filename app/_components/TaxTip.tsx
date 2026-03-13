import { Input } from "@/components/ui/Input";

type TaxTipProps = {
  tax: string;
  tip: string;
  onTaxChange: (value: string) => void;
  onTipChange: (value: string) => void;
};

export function TaxTip({ tax, tip, onTaxChange, onTipChange }: TaxTipProps) {
  return (
    <div>
      <Input
        value={tax}
        onChange={(e) => onTaxChange(e.target.value)}
        placeholder="Tax"
      />
      <Input
        value={tip}
        onChange={(e) => onTipChange(e.target.value)}
        placeholder="Tip"
      />
    </div>
  );
}
