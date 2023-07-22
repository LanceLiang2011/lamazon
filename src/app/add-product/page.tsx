import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Product | Lamazon",
  description: "Mock ecommerce by Lance",
};
async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price"));

  if (!name || !description || !imageUrl || !price) {
    throw "error";
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default function ProductPage() {

  return (
    <div>
      <h1 className=" mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          className=" input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="description"
          className=" textarea textarea-bordered mb-3 w-full"
        ></textarea>
        <input
          name="imageUrl"
          type="url"
          placeholder="Image Url"
          required
          className=" input input-bordered mb-3 w-full"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          className=" input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
