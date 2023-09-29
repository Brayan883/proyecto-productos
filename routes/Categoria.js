const express = require("express");
const {
  listarcategoria,
  createCategoria,
  updatecategoria,
  deleteCategoria,
} = require("../controllers/categoria.controller");
const router = express.Router();

const { validacionData } = require("../middlewares/validacion.schemas");
const {
  CategoriaSchema,
  CategoriaSchemaUpdate,
  deleteCategoriaSchema,
} = require("../schemas/categoria.schema");
const { validarUsuario } = require("../middlewares/auth.usuarios");

router.get("/", validarUsuario, listarcategoria);
router.post(
  "/create",
  validarUsuario,
  validacionData(CategoriaSchema, "/categoria"),
  createCategoria
);
router.post(
  "/update",
  validarUsuario,
  validacionData(CategoriaSchemaUpdate, "/categoria"),
  updatecategoria
);
router.delete(
  "/delete/:id",
  validarUsuario,
  validacionData(deleteCategoriaSchema, "/categoria"),
  deleteCategoria
);
module.exports = router;
