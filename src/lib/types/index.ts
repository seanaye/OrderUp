export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface ItemCount extends Item {
  count: number;
}

export interface Order {
  id: string;
  name: string;
  items: Array<ItemCount>;
  complete: boolean;
}
