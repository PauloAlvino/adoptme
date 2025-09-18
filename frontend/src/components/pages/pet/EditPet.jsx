import { useState, useEffect } from "react";
import api from "../../../utils/api";
import styles from "./AddPet.module.css";
import useFlashMessages from "../../../hooks/useFlshMessages";
import Input from "../../forms/Input";
import Select from "../../forms/Select";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../layouts/Image";

const petColors = [
  { value: "preto", label: "Preto" },
  { value: "branco", label: "Branco" },
  { value: "marrom", label: "Marrom" },
  { value: "caramelo", label: "Caramelo" },
  { value: "cinza", label: "Cinza" },
];

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [preview, setPreview] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessages } = useFlashMessages();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, id]);

  function handleChange(e) {
    setPet((prevPet) => ({ ...prevPet, [e.target.name]: e.target.value }));
  }

  function onFileChange(e) {
    const newFiles = Array.from(e.target.files);
    setPreview((prevPreview) => [...prevPreview, ...newFiles]);
    pet.images = [];
    e.target.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "sucess";
    const formData = new FormData();

    preview.forEach((image) => {
      formData.append("images", image);
    });

    const petData = {
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      color: pet.color,
      available: pet.available,
    };

    Object.keys(petData).forEach((key) => {
      formData.append(key, petData[key]);
    });

    const data = await api
      .patch(`pets/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
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

    if (msgType !== "error") {
      navigate("/pet/mypets");
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Editando o Pet: {pet.name}</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.addpet_form}>
        <Input
          text="Imagens do Pet"
          type="file"
          name="images"
          handleChange={onFileChange}
          multiple={true}
          accept="image/*"
        />
        <Input
          text="Nome do Pet"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleChange={handleChange}
          value={pet.name || ""}
        />
        <Input
          text="Idade do Pet"
          type="number"
          name="age"
          placeholder="Digite a idade"
          handleChange={handleChange}
          value={pet.age || ""}
        />
        <Input
          text="Peso do Pet"
          type="number"
          name="weight"
          placeholder="Digite o peso"
          handleChange={handleChange}
          value={pet.weight || ""}
        />
        <Select
          text="Cor do Pet"
          name="color"
          options={petColors}
          handleChange={handleChange}
          value={pet.color || ""}
        />
        <input type="submit" value="Atualizar Pet" />
      </form>
      <div className={styles.preview_section}>
        <h3>Fotos do Pet</h3>
        <div className={styles.preview_pet_images}>
          {pet.images &&
            preview.length === 0 &&
            pet.images.map(
              (image, index) =>
                typeof image === "string" && (
                  <div
                    key={`existing_${index}`}
                    className={styles.preview_image_container}
                  >
                    <Image
                      src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                      alt={pet.name}
                    />
                  </div>
                )
            )}
          {preview.length > 0 &&
            preview.map((image, index) => (
              <div
                key={`preview_${index}`}
                className={styles.preview_image_container}
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={pet.name || `Imagem ${index + 1}`}
                />
              </div>
            ))}

          {(!pet.images || pet.images.length === 0) && !preview.length && (
            <p className={styles.no_images}>Nenhuma foto selecionada ainda</p>
          )}
        </div>
        {(preview.length > 0 || (pet.images && pet.images.length > 0)) && (
          <p className={styles.image_counter}>
            {preview.length + (pet.images ? pet.images.length : 0)} foto
            {preview.length + (pet.images ? pet.images.length : 0) > 1
              ? "s"
              : ""}{" "}
            selecionada
            {preview.length + (pet.images ? pet.images.length : 0) > 1
              ? "s"
              : ""}
          </p>
        )}
      </div>
    </section>
  );
};

export default EditPet;
