const { User } = require("../models/User");

const getUsers = async (req, res) => {
  //Opciones de la paginacion, limitamos el numero de elementos a mostrar en la consulta
  //a un valor pasado por la query y la pagina
  //asi como también seteamos para no enviar la password
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
    projection: {
      password: 0,
    },
  };

  try {
    const users = await User.paginate({}, options);

    if (users.docs.length === 0)
      return res.status(404).json({ error: "No hay usuarios registrados" });

    return res.json({ users });
  } catch (e) {
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ error: "No existe la información solicitada" });

    user = await User.deleteOne({ _id: id });

    res.status(204).json({ message: "Usuario eliminado correctamente" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Error al eliminar al usuario" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
