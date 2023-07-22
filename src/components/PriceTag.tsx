import { formatPrice } from "@/lib/utils";
import clsx from "clsx";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={clsx("badge", className)}>${formatPrice(price)}</span>
  );
}
