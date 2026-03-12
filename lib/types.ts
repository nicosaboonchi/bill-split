export type Item = {
  claimedBy: string[];
  createdAt: number;
  itemName: string;
  price: number;
};

export type Guest = {
  name: string;
};

export type Bill = {
  guests: Record<string, Guest>;
  items: Record<string, Item>;
  tax: number;
  tip: number;
};
