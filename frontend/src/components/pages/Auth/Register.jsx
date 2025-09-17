import React, { useState } from "react";
import Input from "../../forms/Input";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { Context } from "../../../context/UserContext";
import { useContext } from "react";
const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    register(user);
  }
  return (
    <section className={styles.auth_container}>
      <h1 className={styles.title}>Registro</h1>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Insira seu nome"
          text="Nome"
          handleChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Insira seu e-mail"
          text="E-mail"
          handleChange={handleChange}
        />
        <Input
          name="phone"
          type="text"
          placeholder="Insira seu telefone"
          text="Telefone"
          handleChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Insira sua senha"
          text="Senha"
          handleChange={handleChange}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          text="Confirme a senha"
          handleChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
        <Link to="/login">Ja possui uma conta?</Link>
      </form>
    </section>
  );
};

export default Register;
