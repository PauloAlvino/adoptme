import { useState, useEffect } from "react";
import api from "../../utils/api";
import styles from "./MyAdoptions.module.css";
import Image from "../layouts/Image";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/pets/userAdoptions")
      .then((response) => {
        setPets(response.data.userAdoptions);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Solicitações de Visita</h1>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : pets.length > 0 ? (
        <div className={styles.petlist_container}>
          {pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <div className={styles.pet_image}>
                <Image
                  src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                  alt={pet.name}
                />
              </div>
              <div className={styles.pet_info}>
                <p>
                  <span>Nome do Pet:</span> {pet.name}
                </p>
                <p>
                  <span>Nome:</span> {pet.user.name}
                </p>
                <p>
                  <span>Contato:</span> {pet.user.phone}
                </p>
                <p
                  className={`${styles.status} ${
                    pet.available ? styles.available : styles.adopted
                  }`}
                >
                  {pet.available ? "Disponível" : "Adotado"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Ainda não há solicitações de visita.</p>
      )}
    </section>
  );
}

export default MyAdoptions;
