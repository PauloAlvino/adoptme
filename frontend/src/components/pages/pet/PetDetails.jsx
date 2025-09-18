import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../utils/api";
import { Context } from "../../../context/UserContext";
import useFlashMessage from "../../../hooks/useFlshMessages";
import styles from "./PetDetails.module.css";
import Image from "../../layouts/Image";

function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { auth } = useContext(Context);
  const token = localStorage.getItem("token") || "";
  const { setFlashMessages } = useFlashMessage();

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  async function schedule() {
    let msgType = "sucess";

    const data = await api
      .patch(
        `/pets/adopt/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <div key={index} className={styles.pet_image_container}>
                <Image
                  src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                  alt={pet.name}
                />
              </div>
            ))}
          </div>
          <div className={styles.pet_info}>
            <p>
              <span className={styles.bold}>Peso:</span> {pet.weight}kg
            </p>
            <p>
              <span className={styles.bold}>Idade:</span> {pet.age} anos
            </p>
            <p>
              <span className={styles.bold}>Cor:</span> {pet.color}
            </p>
          </div>
          <div className={styles.contact_info}>
            <p>
              <span className={styles.bold}>Dono:</span> {pet.user.name}
            </p>
            <p>
              <span className={styles.bold}>Contato:</span> {pet.user.phone}
            </p>
          </div>
          <div className={styles.adoption_info}>
            {auth ? (
              <button onClick={schedule} className={styles.adopt_btn}>
                Solicitar uma Visita
              </button>
            ) : (
              <p>
                Você precisa <Link to="/login">fazer login</Link> para solicitar
                uma visita
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default PetDetails;
