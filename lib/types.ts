export type Item = {
  id: string;
  claimedBy: string[];
  itemName: string;
  price: number;
};

export type Guest = {
  id: string;
  name: string;
};

export type Bill = {
  guests: Guest[];
  items: Item[];
  tax: number;
  tip: number;
};

type Tab = {
  id: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
};
