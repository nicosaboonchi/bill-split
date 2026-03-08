import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { type Item } from "../lib/types";

interface CreateBillParams {
  people: string[];
  items: Item[];
  tax: string;
  tip: string;
}

export async function handleCreate({
  people,
  items,
  tax,
  tip,
}: CreateBillParams) {
  const docRef = await addDoc(collection(db, "bills"), {
    people,
    items,
    tax: +tax || 0,
    tip: +tip || 0,
    claims: {},
    createdAt: new Date(),
  });
  return docRef.id;
}
