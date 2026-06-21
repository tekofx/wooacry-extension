interface Data {
  totalPrice: number;
  owners: Owner[];
  shipping: number;
}

interface Sticker {
  name: String;
  priceEach: number;
  quantity: number;
}

interface Owner {
  name: String;
  price: number;
  stickers: Sticker[];
}
