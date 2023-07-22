"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const quantityOptions: JSX.Element[] = Array.from(
    { length: 99 },
    (_, i) => i + 1,
  ).map((n) => (
    <option key={n} value={n}>
      {n}
    </option>
  ));

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={200}
          width={200}
          className="rounded-lg"
        />
      </div>
      <div>
        <Link href={`/products/${product.id}`} className="font-bold">
          {product.name}
        </Link>
        <div>Price:{formatPrice(product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            defaultValue={quantity}
            className="select select-bordered w-fit max-w-[80]"
            onChange={async (e) => {
              const newQuantity = parseInt(e.target.value);
              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity);
              });
            }}
          >
            <option value={0}>0 (Remove)</option>
            {quantityOptions}
          </select>
        </div>
        <div className="flex items-center gap-2">
          Total: {formatPrice(product.price * quantity)}
        </div>
        {isPending && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </div>
      <div className="divider" />
    </div>
  );
}
