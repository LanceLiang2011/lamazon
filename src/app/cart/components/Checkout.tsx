"use client";
export default function Checkout() {
  return (
    <button
      onClick={() => {
        alert(
          "This is a mock website, you can not purchase these stuffs for now. Sorry for that.",
        );
      }}
      className="btn btn-primary sm:w-[200px]"
    >
      Checkout
    </button>
  );
}
