const { Prisma } = require("@prisma/client");
const prisma = require("../db/db");
const bcrypt = require("bcrypt");
const ListarUsuarios = async (req, res) => {
  try {
    const mostrarUsuarios = await prisma.user.findMany({
      select: {
        idUser: true,
        username: true,
        email: true,
      },
    });
    return res.render("usuarios", {
      mostrarUsuarios,
    });
  } catch (e) {
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
    return res.redirect("/usuarios");
  } finally {
    prisma.$disconnect();
  }
};

const createUsuario = async (req, res) => {
  try {
    const { Nombre, Email, Password } = req.body;

    const FindUser = await prisma.user.findUnique({
      where: {
        email: Email,
      },
    });

    if (FindUser) {
      req.flash("menssages", [{type:'warning',message:[{msg: 'El usuario ya existe' }] }]  )
      return res.redirect("/usuarios");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    await prisma.user.create({
      data: {
        username: Nombre,
        email: Email,
        password: hashedPassword,
      },
    });
    req.flash("menssages", [{type:'success',message:[{msg: 'Usuario creado' }] }]  )
    return res.redirect("/usuarios");
  } catch (error) {
    req.flash("menssages", [{type:'warning',message:[{msg: error.message }] }]  )
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
        idUser: parseInt(id),
      },
    });

    if (!FindUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await prisma.user.delete({
      where: {
        idUser: parseInt(id),
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
    const { Nombre, Email, Password, IdActualizar } = req.body;

    const FindUser = await prisma.user.findUnique({
      where: {
        idUser: parseInt(IdActualizar),
      },
    });

    if (!FindUser) {
      req.flash("menssages", [{type:'warning',message:[{msg: 'Usuario no encontrado' }] }]  )
      return res.redirect("/usuarios");
    }

    let hashedPassword = null;
    if (Password) {
      if (Password.length < 6) {
        req.flash("menssages", [{type:'warning',message:[{msg: 'La contraseña debe tener al menos 6 caracteres' }] }]  )
        return res.redirect("/usuarios");
      }
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(Password, salt);
    }
    await prisma.user.update({
      where: {
        idUser: parseInt(IdActualizar),
      },
      data: {
        username: Nombre || FindUser.username,
        email: Email || FindUser.email,
        password: hashedPassword || FindUser.password,
      },
    });
    req.flash("menssages", [{type:'success',message:[{msg: 'Usuario actualizado' }] }]  )
    return res.redirect("/usuarios");
  } catch (e) {    
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.message.includes("user_email_key")) {
        req.flash("menssages", [{type:'warning',message:[{msg: 'El email ya existe' }] }]  )
        return res.redirect("/usuarios");
      }
    }
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
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
