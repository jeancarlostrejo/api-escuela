const { User } = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "Ya se encuentra un usuario registrado con ese email",
      });
    }

    user = new User({ email, password });
    user = await user.save();

    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email o contraseña incorrecta" });

    const hashPassword = user.password;
    const checkPassword = await user.comparePassword(password, hashPassword);

    if (!checkPassword) {
      return res.status(401).json({ message: "Email o contraseña incorrecta" });
    }

    res.json({ message: "Logeado" });
  } catch (error) {
    return res.status(500).json("Error al iniciar sesión");
  }
};

module.exports = { registerUser, loginUser };
