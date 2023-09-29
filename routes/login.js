const express = require("express");
const { mostrarlogin, logoutCerrar, login } = require("../controllers/auth.controller");
const { validacionData } = require("../middlewares/validacion.schemas");
const { loginSchema } = require("../schemas/login.schema");
const router = express.Router();

router.get('/', mostrarlogin  )
router.post('/ingresar', validacionData( loginSchema, '/login' ) , login )
router.get('/salir', logoutCerrar)


module.exports = router;