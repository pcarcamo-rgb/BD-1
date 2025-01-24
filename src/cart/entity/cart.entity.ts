interface CartInterface {
  id: string;
}

export class Cart {
  constructor(public products: CartInterface[]) {}
}
