import styles from "../styles/loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>Cargando...</p>
    </div>
  );
}

export default Loader;
