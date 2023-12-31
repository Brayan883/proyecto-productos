const prisma = require("../db/db");
const fs = require("fs");

const listarProducto = async (req, res, next) => {  
  try {
    const mostrarproducto = await prisma.producto.findMany({
      select: {
        IdProducto: true,
        Nombre: true,
        imagen: true,
        precio: true,
        stock: true,
        cantidad: true,
        Descripcion: true,
        marca: true,
        estado: true,
        categoriaId: true,                
        subtotal: true,                                           
      },
      where: {
        usuarioId: parseInt(req.user.id),
      },          
    });

    

    const mostrarCategoria = await prisma.categoria.findMany({
      select: {
        IdCategoria: true,
        Nombre: true,
      },
    });
    res.render("productos", {
      title: "Producto",
      mostrarproducto,
      mostrarCategoria,
    });
  } catch (e) {
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
    res.redirect("/productos");
  } finally {
    prisma.$disconnect();
  }
};

const createproducto = async (req, res) => {
  try {
    const {
      Nombre,
      Marca,
      precio,
      stock,
      Cantidad,
      Descripcion,
      Estado,
      Categoria,
    } = req.body;
    await prisma.producto
      .create({
        data: {
          Nombre,
          imagen: req.file.filename,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          cantidad: parseInt(Cantidad),
          Descripcion: Descripcion || null,
          marca: Marca || null,
          estado: Estado,
          categoriaId: parseInt(Categoria) || null,
          subtotal: parseFloat(precio) * parseInt(Cantidad) || null,
          usuarioId: parseInt(req.user.id),
        },
      })
      .then(function () {
        req.flash("menssages", [{type:'success',message:[{msg: 'Producto creado' }] }]  )
        res.redirect("/productos");
      });
  } catch (e) {
    console.log(e.message);
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
    res.redirect("/productos");
  } finally {
    prisma.$disconnect();
  }
};

const deleteproducto = async (req, res, next) => {
  try {
    const buscarproducto = await prisma.producto.findUnique({
      where: {
        IdProducto: parseInt(req.params.id),
      },
    });
    if (buscarproducto) {
      if (fs.existsSync("public/img/" + buscarproducto.imagen)) {
        fs.unlinkSync("public/img/" + buscarproducto.imagen);
      }
      await prisma.producto
        .delete({
          where: {
            IdProducto: parseInt(req.params.id),
          },
        })
        .then(function () {         
          res.status(200).json({ message: "Producto eliminado" });
        });
    } else {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    prisma.$disconnect();
  }
};

const UpdateProducto = async (req, res) => {
  console.log(req.body, req.file);
  try {
    const {
      Nombre,
      Marca,
      precio,
      stock,
      Cantidad,
      Descripcion,
      Estado,
      Categoria,
      Id
    } = req.body;    

    const DatoActualizar = await prisma.producto.findUnique({
      where: {
        IdProducto: parseInt(Id),
      },
    });
    if (DatoActualizar) {
      await prisma.producto.update({
        where: {
          IdProducto: DatoActualizar.IdProducto,
        },
        data: {
          Nombre,
          imagen: req.file ? req.file.filename : DatoActualizar.imagen,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          cantidad: parseInt(Cantidad),
          Descripcion: Descripcion,
          marca: Marca,
          estado: Estado,
          categoriaId: parseInt(Categoria),
          subtotal: parseFloat(precio) * parseInt(Cantidad) || null,
          usuarioId: parseInt(req.user.id),
        },
      });
      req.flash("menssages", [{type:'success',message:[{msg: 'Producto actualizado' }] }]  )
      return res.redirect("/productos");
    } else {
      req.flash("menssages", [{type:'warning',message:[{msg: 'Producto no encontrado' }] }]  )
      return res.redirect("/productos");
    }
  } catch (e) {
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
    return res.redirect("/productos");
  } finally {
    prisma.$disconnect();
  }
};

const ListarUnProducto = async (req, res) => {
  try {
    const buscarproducto = await prisma.producto.findUnique({
      select: {
        IdProducto:true,
        Nombre: true,
        imagen: true,
        precio: true,
        stock: true,
        cantidad: true,
        Descripcion: true,
        marca: true,
        estado: true,
        categoriaId: true,
        subtotal: true,
      },
      where: {
        IdProducto: parseInt(req.params.id),
      },
    });

    if (!buscarproducto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(buscarproducto);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  listarProducto,
  createproducto,
  UpdateProducto,
  deleteproducto,
  ListarUnProducto,
};
