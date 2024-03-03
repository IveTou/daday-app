import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Access List of Boards
        </p>
        <div>
          <Link href='/boards'> Go to Boards</Link>
        </div>
      </div>
    </main>
  );
}
