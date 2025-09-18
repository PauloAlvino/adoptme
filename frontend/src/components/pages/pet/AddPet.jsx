import { useState } from "react";
import api from "../../../utils/api";
import styles from "./AddPet.module.css";
import useFlashMessages from "../../../hooks/useFlshMessages";
import Input from "../../forms/Input";
import Select from "../../forms/Select";
import { useNavigate } from "react-router-dom";

const petColors = [
  { value: "preto", label: "Preto" },
  { value: "branco", label: "Branco" },
  { value: "marrom", label: "Marrom" },
  { value: "caramelo", label: "Caramelo" },
  { value: "cinza", label: "Cinza" },
];

const AddPet = () => {
  const [pet, setPet] = useState({});
  const [preview, setPreview] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessages } = useFlashMessages();
  const navigate = useNavigate();

  function handleChange(e) {
    setPet((prevPet) => ({ ...prevPet, [e.target.name]: e.target.value }));
  }

  function onFileChange(e) {
    const newFiles = Array.from(e.target.files);
    setPreview((prevPreview) => [...prevPreview, ...newFiles]);
    setPet((prevPet) => ({
      ...prevPet,
      images: prevPet.images ? [...prevPet.images, ...newFiles] : newFiles,
    }));

    e.target.value = "";
  }

  function removeImage(index) {
    setPreview((prevPreview) => prevPreview.filter((_, i) => i !== index));
    setPet((prevPet) => ({
      ...prevPet,
      images: prevPet.images.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "sucess";

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .post(`pets/create`, formData, {
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
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
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
        />
        <Input
          text="Idade do Pet"
          type="number"
          name="age"
          placeholder="Digite a idade"
          handleChange={handleChange}
        />
        <Input
          text="Peso do Pet"
          type="number"
          name="weight"
          placeholder="Digite o peso"
          handleChange={handleChange}
        />
        <Select
          text="Cor do Pet"
          name="color"
          options={petColors}
          handleChange={handleChange}
          value={pet.color || ""}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <div className={styles.preview_section}>
        <h3>Preview das Fotos</h3>
        <div className={styles.preview_pet_images}>
          {preview.length > 0 ? (
            preview.map((image, index) => (
              <div
                key={`preview_${index}`}
                className={styles.preview_image_container}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={pet.name || `Imagem ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles.remove_button}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className={styles.no_images}>Nenhuma foto selecionada ainda</p>
          )}
        </div>
        {preview.length > 0 && (
          <p className={styles.image_counter}>
            {preview.length} foto{preview.length > 1 ? "s" : ""} selecionada
            {preview.length > 1 ? "s" : ""}
          </p>
        )}
      </div>
    </section>
  );
};

export default AddPet;
