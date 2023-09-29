const express = require("express");
const {
  ListarUsuarios,
  createUsuario,
  UpdateUsuario,
  deleteUsuario,
} = require("../controllers/usuario.controller");
const { validacionData } = require("../middlewares/validacion.schemas");
const {
  Usuario_schema,
  deleteUserSchema,
  UpdateUsuarioSchema
} = require("../schemas/usuario.schema");
const { validarUsuario } = require("../middlewares/auth.usuarios");

const router = express.Router();



router.get("/", validarUsuario ,ListarUsuarios);
router.post(
  "/create",
  validarUsuario,
  validacionData(Usuario_schema, "/usuarios"),
  createUsuario
);
router.post(
  "/update",
  validarUsuario,
  validacionData( UpdateUsuarioSchema , "/usuarios"),
  UpdateUsuario
);
router.delete(
  "/delete/:id",
  validarUsuario,
  validacionData(deleteUserSchema, "/usuarios"),
  deleteUsuario
);

module.exports = router;
