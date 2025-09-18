const jwt = require("jsonwebtoken");
const getUserToken = require("./getUserToken");
const protectedRoutes = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(422).json({ message: "Acesso negado" });
  }

  const token = getUserToken(req);

  if (!token) {
    return res.status(422).json({ message: "Acesso negado" });
  }
  try {
    const verified = jwt.verify(token, "mysecret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(422).json({ message: "Token Invalido" });
  }
};

module.exports = protectedRoutes;
