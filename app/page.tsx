import { Header } from "@/components/Header";
import { BillForm } from "./_components/BillForm";
import { Separator } from "@/components/ui/Separator";

export default function Page() {
  return (
    <main className="max-w-lg px-4 py-8 mx-auto ">
      <div className="bg-yellow-50 px-6 py-8 flex flex-col gap-4">
        <Header />
        <Separator />
        <BillForm />
        <span className="flex justify-center items-center">✦ Thank you ✦</span>
      </div>
    </main>
  );
}
