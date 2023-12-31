"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <div>Something went wrong. Please refresh the page.</div>
      <Link className="btn btn-error" href={`/`}>
        Send me home
      </Link>{" "}
    </>
  );
}
