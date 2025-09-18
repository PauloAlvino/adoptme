const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "mysecret",
    {
      expiresIn: "1d",
    }
  );
  res.status(200).json({ message: "Token criado com sucesso", token: token });
};

module.exports = createUserToken;
