export interface ListItem {
  name: string;
  amount: string;
  bought: boolean;
}

export interface ShoppingList {
  id: number;
  name: string;
  items: ListItem[];
}

export const initialLists: ShoppingList[] = [
  {
    id: 1,
    name: 'Velikonoční nákup',
    items: [
      { name: 'Vajíčka', amount: '10 ks', bought: true },
      { name: 'Mouka', amount: '1 kg', bought: false },
    ],
  },
  {
    id: 2,
    name: 'Nákup na chatu',
    items: [
      { name: 'Pivo', amount: '6 ks', bought: false },
      { name: 'Grilovací maso', amount: '2 kg', bought: false },
    ],
  },
  {
    id: 3,
    name: 'Drogerie',
    items: [
      { name: 'Šampon', amount: '1 ks', bought: true },
      { name: 'Toaletní papír', amount: '10 rolí', bought: true },
    ],
  },
];
