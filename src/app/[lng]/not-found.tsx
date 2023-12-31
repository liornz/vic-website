import Link from 'next/link';
import styles from './error.module.scss';

export default function NotFound() {
  return (
    <div className={styles.section}>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.sub}>We can&#39;t find the page you are looking for. Go back home!</p>
      <Link href="/" className={styles.button}>
        Home
      </Link>
    </div>
  );
}
