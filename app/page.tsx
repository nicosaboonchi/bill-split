import { Header } from "@/components/Header";
import { BillForm } from "./_components/BillForm";
import { Separator } from "@/components/ui/Separator";

export default function Page() {
  return (
    <main className="max-w-lg mx-auto p-4 ">
      <Header />
      <BillForm />
    </main>
  );
}
