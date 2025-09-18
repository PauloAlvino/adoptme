const getUserToken = (req) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("Nenhum token recebido");
  }
  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error("Erro no token");
  }
  return parts[1];
};

module.exports = getUserToken;
