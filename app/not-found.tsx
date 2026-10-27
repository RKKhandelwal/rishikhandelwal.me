import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <svg
        className="ball"
        viewBox="0 0 64 64"
        role="img"
        aria-label="A tennis ball rolling away"
      >
        <circle cx="32" cy="32" r="27" fill="#e4f45a" />
        <path
          d="M9 16 Q27 32 9 48"
          fill="none"
          stroke="#101513"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M55 16 Q37 32 55 48"
          fill="none"
          stroke="#101513"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <p className="tag">ERROR 404</p>
      <h1>
        Fault.
        <br />
        <em>Double fault.</em>
      </h1>
      <p>
        That page didn&apos;t clear the net. It may have moved, or it never
        landed here in the first place.
      </p>
      <Link href="/" className="text-link">
        Back to the campus ↗
      </Link>
    </main>
  );
}
