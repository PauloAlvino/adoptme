import { useState, useContext } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";

const Navbar = () => {
  const { auth, logout } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLinkClick();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.navbar} container`}>
          <div className={styles.logo}>
            <img src={Logo} alt="Adoptme Logo" className={styles.image} />
            <h1>Adoptme</h1>
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>

          <nav className={isMenuOpen ? styles.navMenuOpen : ""}>
            <ul className={styles.links}>
              <li onClick={handleLinkClick}>
                <Link to="/">Adotar</Link>
              </li>
              {auth ? (
                <>
                  <li onClick={handleLinkClick}>
                    <Link to='/pet/myadoptions'>Minhas Adoções</Link>
                  </li>
                  <li onClick={handleLinkClick}>
                    <Link to='/pet/mypets'>Meus Pets</Link>
                  </li>
                  <li onClick={handleLinkClick}>
                    <Link to='/user/profile'>Perfil</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to="#">Sair</Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={handleLinkClick}>
                    <Link to="/login">Login</Link>
                  </li>
                  <li onClick={handleLinkClick}>
                    <Link to="/register">Registro</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      {isMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;