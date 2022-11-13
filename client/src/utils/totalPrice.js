import discountPrice from './discount';

export default function totalPrice(cartList, shippingFee) {
  return parseFloat(
    (
      cartList?.reduce(
        (acc, curr) =>
          acc + discountPrice(curr.price, curr.discount) * curr.qty,
        0
      ) + shippingFee
    ).toFixed(2)
  );
}
