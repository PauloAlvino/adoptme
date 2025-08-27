const User = require("../models/User");
const bcrypt = require("bcrypt");
const createUserToken = require("../helpers/createUserToken");
const getUserToken = require("../helpers/getUserToken");
const jwt = require("jsonwebtoken");
module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword, phone } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(409).json({ message: "O usuário ja existe" });
      return;
    }

    if (!name || !email || !password || !confirmPassword || !phone) {
      res.status(422).json({ message: "Todos os campos sao obrigatorios" });
      return;
    }
    if (password !== confirmPassword) {
      res.status(422).json({ message: "As senhas não conferem" });
      return;
    }
    if (!emailRegex.test(email)) {
      res.status(422).json({ message: "Insira um e-mail válido" });
      return;
    }
    if (password.length < 6) {
      res
        .status(422)
        .json({ message: "A senha deve possuir mais de 6 caracteres" });
      return;
    }
    if (!phoneRegex.test(phone)) {
      res.status(422).json({ message: "Insira um telefone válido" });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!email || !password) {
      res.status(422).json({ message: "Todos os campos sao obrigatorios" });
      return;
    }
    if (!user) {
      res.status(422).json({ message: "Usuário não existe" });
      return;
    }
    if (!passwordMatch) {
      res.status(422).json({ message: "Credenciais incorretas" });
      return;
    }
    try {
      await createUserToken(user, req, res);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  static async findUser(req, res) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      const token = getUserToken(req);
      const decoded = jwt.verify(token, "mysecret");

      const currentUser = await User.findById(decoded.id).select("-password");

      if (!currentUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json(currentUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuário", error: err.message });
    }
  }
};
