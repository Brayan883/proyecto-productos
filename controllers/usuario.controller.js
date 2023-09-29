const prisma = require("../db/db");
const bcrypt = require("bcrypt");
const ListarUsuarios = async (req, res) => {
  try {
    const mostrarUsuarios = await prisma.user.findMany({
      select: {
        IdUser: true,
        username: true,
        email: true,
      },
    });
    return res.render("usuarios", {
      mostrarUsuarios,
    });
  } catch (e) {
    console.log(e.message);
    return res.redirect("/usuarios");
  } finally {
    prisma.$disconnect();
  }
};

const createUsuario = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const FindUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (FindUser)
      return res.status(400).json({ message: "El usuario ya existe" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log("Usuario creado");
    return res.redirect("/usuarios");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/usuarios");
  } finally {
    prisma.$disconnect();
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const FindUser = await prisma.user.findUnique({
      where: {
        IdUser: parseInt(id),
      },
    });

    if (!FindUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await prisma.user.delete({
      where: {
        IdUser: parseInt(id),
      },
    });
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    prisma.$disconnect();
  }
};

const UpdateUsuario = async (req, res) => {
  try {
    const { username, email, password, Id } = req.body;

    const FindUser = await prisma.user.findUnique({
      where: {
        IdUser: parseInt(Id),
      },
    });

    if (!FindUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: {
        IdUser: parseInt(Id),
      },
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log("Usuario actualizado");
    return res.redirect("/usuarios");
  } catch (e) {
    console.log(e.message);
    return res.redirect("/usuarios");
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  ListarUsuarios,
  createUsuario,
  deleteUsuario,
  UpdateUsuario,
};
