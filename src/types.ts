interface ListItem {
  name: string;
  amount: string;
  bought: boolean;
}

export interface ShoppingList {
  name: string;
  items: ListItem[];
}
