export default function discountPrice(price, discount) {
  return parseFloat((price - (price * discount) / 100).toFixed(2));
}
