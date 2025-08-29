const getUserByToken = require("../helpers/getUserByToken");
const getUserToken = require("../helpers/getUserToken");
const Pet = require("../models/Pet");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async createPet(req, res) {
    const { name, age, weight, color } = req.body;
    const images = req.files;
    const available = true;
    if (!name || !age || !weight || !color || images.length === 0) {
      res.status(422).json({ message: "Todos os campos sao obrigatorios" });
      return;
    }
    const token = getUserToken(req);
    const user = await getUserByToken(token);

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        image: user.image,
      },
    });
    images.map((image) => {
      pet.images.push(image.filename);
    });
    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "Pet criado com sucesso", newPet });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getAllPets(req, res) {
    try {
      const pets = await Pet.find().sort("-createdAt");
      res.status(200).json({ pets: pets });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getUserPets(req, res) {
    const token = getUserToken(req);
    const user = await getUserByToken(token);
    try {
      const userPets = await Pet.find({ "user._id": user._id }).sort(
        "-createdAt"
      );
      res.status(200).json({ userPets: userPets });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getPet(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID Invalido" });
      return;
    }
    try {
      const pet = await Pet.findById(id);
      if (!pet) {
        res.status(404).json({ message: "Pet não existe" });
        return;
      }
      res.status(200).json({ pet: pet });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async deletePet(req, res) {
    const id = req.params.id;
    const token = getUserToken(req);
    const user = await getUserByToken(token);
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID Invalido" });
      return;
    }
    try {
      const pet = await Pet.findById(id);
      if (!pet) {
        res.status(404).json({ message: "Pet não existe" });
        return;
      }
      if (!pet.user._id.equals(user._id)) {
        res
          .status(422)
          .json({ message: "Houve um problema. Tente mais tarde" });
        return;
      }
      await Pet.findByIdAndDelete(id);
      res.status(200).json({ message: "Pet deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async updatePet(req, res) {
    const { name, age, weight, color } = req.body;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID Invalido" });
      return;
    }
    const pet = await Pet.findById(id);
    if (!pet) {
      res.status(404).json({ message: "Pet não existe" });
      return;
    }
    const updatedData = {};
    const files = req.files;
    const token = getUserToken(req);
    const user = await getUserByToken(token);
    if (!pet.user._id.equals(user._id)) {
      res.status(422).json({ message: "Houve um problema. Tente mais tarde" });
      return;
    }
    if (!name) {
      res.status(422).json({ message: "Nome é obrigatorio" });
      return;
    } else {
      updatedData.name = name;
    }
    if (!age) {
      res.status(422).json({ message: "Idade é obrigatorio" });
      return;
    } else {
      updatedData.age = age;
    }
    if (!weight) {
      res.status(422).json({ message: "Peso é obrigatorio" });
      return;
    } else {
      updatedData.weight = weight;
    }
    if (!color) {
      res.status(422).json({ message: "Cor é obrigatorio" });
      return;
    } else {
      updatedData.color = color;
    }
    updatedData.images = [];
    if (files.length === 0) {
      pet.images.map((image) => {
        updatedData.images.push(image);
      });
    } else {
      files.map((image) => {
        updatedData.images.push(image.filename);
      });
    }
    const newPet = await Pet.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Pet atualizado com sucesso", newPet });
  }
  static async getUserAdoptions(req, res) {
    const token = getUserToken(req);
    const user = await getUserByToken(token);
    try {
      const userAdoptions = await Pet.find({ "adopter._id": user._id }).sort(
        "-createdAt"
      );
      res.status(200).json({ userAdoptions: userAdoptions });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async adoptPet(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido" });
    }

    try {
      const pet = await Pet.findById(id);
      if (!pet) {
        return res.status(404).json({ message: "Pet não existe" });
      }

      const token = getUserToken(req);
      const user = await getUserByToken(token);

      if (pet.adopter && pet.adopter._id.toString() === user._id.toString()) {
        return res
          .status(422)
          .json({ message: "Você já solicitou a adoção deste Pet" });
      }

      if (!pet.available) {
        return res
          .status(400)
          .json({ message: "Pet indisponível para adoção" });
      }

      if (pet.user._id.toString() === user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Você não pode adotar o próprio Pet" });
      }
      const petAdopted = await Pet.findByIdAndUpdate(
        id,
        { $set: { adopter: user } },
        { new: true }
      );

      return res.status(200).json({
        message: `Visita agendada com sucesso! Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
        pet: petAdopted,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }
  static async concludeAdopt(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido" });
    }
    const pet = await Pet.findById(id);
    if (!pet.available) {
      return res
        .status(404)
        .json({ message: "O Pet já foi adotado" });
    }
    if (!pet.adopter) {
      return res
        .status(404)
        .json({ message: "Não tem ninguem para adotar no momento" });
    }
    if (!pet) {
      return res.status(404).json({ message: "Pet não existe" });
    }
    const token = getUserToken(req);
    const user = await getUserByToken(token);
    if (!pet.user._id.equals(user._id)) {
      return res
        .status(422)
        .json({ message: "Houve um problema. Tente mais tarde" });
    }
    pet.available = false;
    await Pet.findByIdAndUpdate(id, pet);
    res.status(200).json({ message: "Processo de adoção finalizado" });
  }
};
