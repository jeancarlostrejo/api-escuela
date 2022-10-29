const jwt = require("jsonwebtoken");

/**
 * Debes pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );

  return token;
};

const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Require token de acceso en formato Bearer",
  "jwt malformed": "JWT formato no válido",
};
module.exports = {
  tokenSign,
  tokenVerificationErrors,
};
