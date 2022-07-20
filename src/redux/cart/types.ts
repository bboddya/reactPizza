export type CartItem = {
  count: number;
  id: string;
  imageUrl: string;
  price: number;
  size: number;
  title: string;
  type: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
