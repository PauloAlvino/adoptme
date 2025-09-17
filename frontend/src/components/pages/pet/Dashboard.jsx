import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import styles from "./Dashboard.module.css";
import useFlashMessage from "../../../hooks/useFlshMessages";
import Image from "../../layouts/Image";

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessages } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/userPets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.userPets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  async function removePet(id) {
    let msgType = "sucess";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessages(data.message, msgType);
  }

  async function concludeAdoption(id) {
    let msgType = "sucess";

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets</h1>
        <Link to="/pet/add" className={styles.add_pet_button}>
          Adicionar Pet
        </Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petcard}>
              <div className={styles.petcard_image_container}>
                <Image
                  src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                  alt={pet.name}
                />
              </div>
              <span className={styles.petcard_info}>
                <h3>{pet.name.length > 17 ? `${pet.name.slice(0, 17)}...` : pet.name}</h3>
                <p>
                  <span className={styles.bold}>Peso:</span> {pet.weight}kg
                </p>
                {!pet.available && (
                  <p className={styles.adopted_text}>Adotado</p>
                )}
              </span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={`${styles.conclude_btn} ${styles.btn}`}
                        onClick={() => concludeAdoption(pet._id)}
                      >
                        Concluir Adoção
                      </button>
                    )}
                    <Link
                      to={`/pet/edit/${pet._id}`}
                      className={`${styles.edit_btn} ${styles.btn}`}
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => removePet(pet._id)}
                      className={`${styles.delete_btn} ${styles.btn}`}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p className={styles.adopted_info}>
                    Parabéns por concluir a adoção!
                  </p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && (
          <p className={styles.no_pets}>
            Você ainda não possui pets cadastrados!
          </p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
