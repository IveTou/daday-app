import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <p><Link href='/boards'> Go to Boards</Link></p>
          <p><Link href="/api/auth/login">Login</Link></p>
          <p><Link href="/api/auth/logout">Logout</Link></p>
        </div>
      </div>
    </main>
  );
}
