import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ShareBill() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <Button onClick={handleCopy}>
      {copied ? "Link Copied!" : "Share Bill"}
    </Button>
  );
}
