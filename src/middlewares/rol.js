/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;

    const checkValueRol = roles.some(
      (rolSingle) => rolesByUser.includes(rolSingle) // true o false
    );

    if (!checkValueRol) {
      res.status(403).json({ error: "No tienes los permisos necesarios" });
      return;
    }

    next();
  } catch (e) {
    res.status(403).json({ error: "Error en la verificacion de los permisos" });
    return;
  }
};

module.exports = { checkRol };
