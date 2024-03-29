interface ListItem {
  name: string;
  amount: string;
}

export interface ShoppingList {
  name: string;
  items: ListItem[];
}
