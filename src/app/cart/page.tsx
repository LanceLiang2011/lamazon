import { getCart } from "@/lib/db/cart";
import CartEntry from "./components/CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/utils";
import Checkout from "./components/Checkout";

export const metadata = {
  title: "Cart | Lamazon",
};
export default async function CartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((item) => (
        <CartEntry
          setProductQuantity={setProductQuantity}
          key={item.id}
          cartItem={item}
        />
      ))}
      {!cart?.items.length && (
        <p>Your cart is empty.You may refresh the page to see your items</p>
      )}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal ?? 0)}
        </p>
        <Checkout />
      </div>
    </div>
  );
}
