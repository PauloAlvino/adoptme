import styles from "./AuthContainer.module.css";
const AuthContainer = ({ children }) => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>{children}</div>
      <div className={styles.auth_image}></div>
    </main>
  );
};

export default AuthContainer;
