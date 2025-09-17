import { Link } from "react-router-dom";
import Input from "../../forms/Input";
import styles from "./Login.module.css";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/UserContext";

const Login = () => {
  const [user, setUser ] = useState({});
  const {login} = useContext(Context)
  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }
  function handleSubmit(e) {
    e.preventDefault();
    login(user)
  }
  return (
    <section className={styles.auth_container}>
        <h1 className={styles.title}>Login</h1>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
            <Input name='email' type='text' placeholder='Insira seu e-mail' text='E-mail' handleChange={handleChange}/>
            <Input name='password' type='password' placeholder='Insira sua senha' text='Senha' handleChange={handleChange}/>
            <input type="submit" value='Entrar'/>
            <Link to='/register'>Não possui conta?</Link>
        </form>
    </section>
  );
};

export default Login;
