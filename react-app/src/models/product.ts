export interface Product {
  id: number;
  articleNumber: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Products {
  items: Product[];
  totalItems: number;
}
