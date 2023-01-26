const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { tokenVerificationErrors } = require("../utils/tokenManager");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("No Bearer");

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(dataToken._id, { password: 0 });

    if (!user) {
      res.status(401).json({ error: "Usuario del token no encontrado" });
      return;
    }
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: tokenVerificationErrors[error.message] });
  }
};

module.exports = { authMiddleware };
