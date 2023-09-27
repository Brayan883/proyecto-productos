const prisma = require("../db/db");
const listarcategoria = async (req, res, next) => {
  try {
    const mostrarCategoria = await prisma.categoria.findMany({
      select: {
        IdCategoria: true,
        Nombre: true,
        estado: true,
      },
    });
    res.render("categoria", {
      title: "categoria",
      mostrarCategoria,
    });
  } catch (e) {
    console.log(e.message);
    res.redirect("/categoria");
  } finally {
    prisma.$disconnect();
  }
};

const createCategoria = async (req, res) => {
  try {
    const { Nombre, Estado } = req.body;
    console.log(req.body);
    await prisma.categoria
      .create({
        data: {
          Nombre,
          estado: Estado,
        },
      })
      .then(function () {
        console.log("Categoria creado");
        res.redirect("/categoria");
      });
  } catch (e) {
    console.log(e.message);
  } finally {
    prisma.$disconnect();
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const buscarCategoria = await prisma.categoria.findUnique({
      where: {
        IdCategoria: parseInt(id),
      },
    });

    if (!buscarCategoria)
      return res.status(404).json({ message: "Categoria no encontrada" });

    await prisma.categoria.delete({
      where: {
        IdCategoria: parseInt(id),
      },
    });

    return res.status(200).json({ message: "Categoria eliminada" });
  } catch (e) {
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    prisma.$disconnect();
  }
};

const updatecategoria = async (req, res) => {
  try {
    const { Nombre, Estado, IdActualizar } = req.body;
    await prisma.categoria.update({
      where: {
        IdCategoria: parseInt(IdActualizar),
      },
      data: {
        Nombre,
        estado: Estado,
      },
    });
    res.redirect("/categoria");
  } catch (e) {
    console.log(e.message);
    res.redirect("/categoria");
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  listarcategoria,
  createCategoria,
  deleteCategoria,
  updatecategoria,
};
