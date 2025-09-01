import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.navbar} container`}>
        <div className={styles.logo}>
          <img src={Logo} alt="" className={styles.image}/>
          <h1>Adoptme</h1>
        </div>
        <nav>
          <ul className={styles.links}>
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Login</Link>
            </li>
            <li>
              <Link>Registro</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
