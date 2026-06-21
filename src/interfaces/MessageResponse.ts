interface MessageResponse {
  subtotal: number;
  shipping: number;
  shippingPerOwner: number;
  totalPayment: number;
  owners: Owner[];
  stickers: Sticker[];
}
