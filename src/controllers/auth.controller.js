const { User } = require("../models/User");
const { tokenSign } = require("../utils/tokenManager");

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        error:
          "Ya se encuentra un usuario registrado con ese nombre de usuario",
      });
    }
    user = new User({ username, password, role });
    user = await user.save();

    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente" });
  } catch (e) {
    return res.status(500).json({ error: "Error al registrar al usuario" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrecta" });

    const hashPassword = user.password;
    const checkPassword = await user.comparePassword(password, hashPassword);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrecta" });
    }

    const token = tokenSign(user);
    const userLogged = {
      username: user.username,
      role: user.role,
    };

    res.json({ message: "Logueado", token, user: userLogged });
  } catch (error) {
    return res.status(500).json("Error al iniciar sesión");
  }
};

module.exports = { registerUser, loginUser };
