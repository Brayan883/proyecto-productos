const express = require("express");
const { ListarDashboard } = require("../controllers/dashboard.controller");
const { validarUsuario } = require("../middlewares/auth.usuarios");

const router = express.Router();
router.get("/", validarUsuario, ListarDashboard);

module.exports = router;
