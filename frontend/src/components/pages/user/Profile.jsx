import api from "../../../utils/api";
import useFlashMessages from "../../../hooks/useFlshMessages";
import Input from "../../forms/Input";
import Image from "../../layouts/Image";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/UserContext";

const Profile = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessages } = useFlashMessages();
  useEffect(() => {
    api
      .get("/users/finduser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleImage(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let msgType = "sucess";
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));
    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
    setFlashMessages(data.message, msgType);
  }
  return (
    <section className={styles.prof_container}>
      <div>
        <h1 className={styles.title}>Perfil</h1>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="image"
            type="file"
            placeholder="Insira sua foto"
            text="Foto"
            handleChange={handleImage}
          />
          <Input
            name="name"
            type="text"
            placeholder="Insira seu nome"
            text="Nome"
            handleChange={handleChange}
            value={user.name || ""}
          />
          <Input
            name="email"
            type="text"
            placeholder="Insira seu e-mail"
            text="E-mail"
            handleChange={handleChange}
            value={user.email || ""}
          />
          <Input
            name="phone"
            type="text"
            placeholder="Insira seu telefone"
            text="Telefone"
            handleChange={handleChange}
            value={user.phone || ""}
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
          <input type="submit" value="Editar" />
        </form>
      </div>
      <div className={styles.image_cont}>
        {(user.image || preview) && (
          <Image
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
        {user.name && <h1>{user.name.split(" ")[0]}</h1>}
      </div>
    </section>
  );
};

export default Profile;
