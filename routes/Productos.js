const express = require('express');
const { listarProducto, createproducto , deleteproducto , updateproducto, ActualizarProducto } = require('../controllers/producto.controller');
const { validacionMulter , validacionMulterOpcional     } = require('../middlewares/multer.validacion');
const { validacionData } = require('../middlewares/validacion.schemas');
const { Producto_schema ,    Producto_schema_update , deleteSchema } = require('../schemas/producto.schema');
const router = express.Router();

router.get('/', listarProducto );
router.post('/create', validacionMulter ,validacionData(Producto_schema, '/')  ,createproducto );
router.delete('/delete/:id',  validacionData(deleteSchema , '/' ), deleteproducto );
router.get('/update/:id', updateproducto );
router.post('/update/:id', validacionMulterOpcional , validacionData(Producto_schema_update, '/'), ActualizarProducto );
module.exports = router;
