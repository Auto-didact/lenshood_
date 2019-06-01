export function Refund(cartArray) {
  return cartArray.reduce((acum, item) => {
    acum += item.refund;
    return acum;
  }, 0);
}
export function TotalAmount(cart) {
  let total = TotalRent(cart);
  total -= 0.25 * total;
  total += 100; // service tax
  return total;
}
export function TotalRent(cartArray) {
  return cartArray.reduce((acum, item) => {
    acum += item.days * item.rent;
    return acum;
  }, 0);
}
