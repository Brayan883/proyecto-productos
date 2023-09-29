const express = require("express");
const {
  listarProducto,
  createproducto,
  deleteproducto,
  UpdateProducto,
  ListarUnProducto,
} = require("../controllers/producto.controller");
const {
  validacionMulter,
  validacionMulterOpcional,
} = require("../middlewares/multer.validacion");
const { validacionData } = require("../middlewares/validacion.schemas");
const {
  Producto_schema,
  Producto_schema_update,
  deleteSchema,
} = require("../schemas/producto.schema");
const { validarUsuario } = require("../middlewares/auth.usuarios");
const router = express.Router();

router.get("/", validarUsuario, listarProducto);
router.get(
  "/listar/:id",
  validarUsuario,
  validacionData(deleteSchema, "/productos"),
  ListarUnProducto
);
router.post(
  "/create",
  validarUsuario,
  validacionMulter,
  validacionData(Producto_schema, "/productos"),
  createproducto
);
router.delete(
  "/delete/:id",
  validarUsuario,
  validacionData(deleteSchema, "/productos"),
  deleteproducto
);
router.post(
  "/update/producto",
  validarUsuario,
  validacionMulterOpcional,
  validacionData(Producto_schema_update, "/productos"),
  UpdateProducto
);
module.exports = router;
