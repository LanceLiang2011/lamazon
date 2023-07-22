import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <div className="mb-3 text-3xl"> Page not found. </div>
      <Link className="btn btn-error" href={`/`}>
        Send me home
      </Link>{" "}
    </div>
  );
}
