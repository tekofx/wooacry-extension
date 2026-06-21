interface Data {
  totalPrice: number;
  owners: Owner[];
  shipping: number;
}

interface Owner {
  name: String;
  price: number;
  stickers: Sticker[];
}
