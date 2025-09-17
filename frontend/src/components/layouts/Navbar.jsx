import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";
import { useContext } from "react";
const Navbar = () => {
  const { auth, logout } = useContext(Context);
  return (
    <header className={styles.header}>
      <div className={`${styles.navbar} container`}>
        <div className={styles.logo}>
          <img src={Logo} alt="" className={styles.image} />
          <h1>Adoptme</h1>
        </div>
        <nav>
          <ul className={styles.links}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {auth ? (
              <>
                <li>
                  <Link>Adotar</Link>
                </li>
                <li>
                  <Link to='/pet/mypets'>Meus Pets</Link>
                </li>
                <li>
                  <Link to='/user/profile'>Perfil</Link>
                </li>
                <li onClick={logout}>
                  <Link>Sair</Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Registro</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
