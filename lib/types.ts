export interface Item {
  name: string;
  price: number;
}

export interface Bill {
  people: string[];
  items: Item[];
  tax: number;
  tip: number;
  claims: Record<string, string[]>;
}

export interface PersonTotal {
  sub: number;
  taxShare: number;
  tipShare: number;
  total: number;
}

// // {
//     guests: {
//         uuid: {
//             name
//         }
//         uuid2: {
//             name: name,

//         }
//     },
//     items: {
//         item uuid: {
//             item,
//             price
//             assignto: [guest uuid]
//         }
//     },
//     tax,
//     tip
// }
