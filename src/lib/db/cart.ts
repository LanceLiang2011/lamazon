import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export interface ShoppingCart extends CartWithProducts {
  size: number;
  subtotal: number;
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  //FIXME:   Need further encrypt if used for production.
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;
  return {
    ...cart,
    size: cart.items.reduce((acc, cur) => acc + cur.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, cur) => acc + cur.quantity * cur.product.price,
      0,
    ),
  };
}
