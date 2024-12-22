import styles from "../../../page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Authentication Success</h1>
        <p>Congrats on connecting your CLI!</p>
      </main>
    </div>
  );
}
