import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <Link href='/boards'> Go to Boards</Link>
          <Link href="/api/auth/login">Login</Link>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </div>
    </main>
  );
}
