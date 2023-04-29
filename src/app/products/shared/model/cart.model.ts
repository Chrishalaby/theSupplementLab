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

export interface chosenProduct {
  id: number;
}

export interface User {
  name: string;
  phoneNumber: number;
  address: string;
  addressExtra: string;
  email: string;
  message: string;
}

export interface Offer {
  id: number;
  image: string;
  name: string;
  price: number;
}
