import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.viewportDiv}`}>
        <div className={styles.title}>Post jiu-jitsu</div>
      </div>
      <div className={`${styles.viewportDiv}`}>
        <div className={styles.title}>BJJ</div>
      </div>
    </div>
  );
}
