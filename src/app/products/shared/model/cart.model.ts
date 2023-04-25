export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  type: string;
  flavors: Array<string>;
  chosenFlavor: string;
  sizes: object;
  quantity: number;
}
