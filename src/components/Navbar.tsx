import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function searchProduct(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navbar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-100">
      <div className="navbar mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href={`/`} className="">
            <Image
              src={logo}
              alt="lamazon logo"
              height={70}
              width={70}
              className="transition duration-500 hover:translate-y-2 hover:scale-150"
            />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                name="searchQuery"
                type="text"
                placeholder="search"
                className="min-w-200 input input-bordered w-full"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
