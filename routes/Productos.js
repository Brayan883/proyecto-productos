const express = require('express');
const { listarProducto, createproducto , deleteproducto , UpdateProducto, ListarUnProducto,  } = require('../controllers/producto.controller');
const { validacionMulter , validacionMulterOpcional     } = require('../middlewares/multer.validacion');
const { validacionData } = require('../middlewares/validacion.schemas');
const { Producto_schema ,    Producto_schema_update , deleteSchema } = require('../schemas/producto.schema');
const router = express.Router();

router.get('/', listarProducto );
router.get('/listar/:id', ListarUnProducto )
router.post('/create', validacionMulter ,validacionData(Producto_schema, '/')  ,createproducto );
router.delete('/delete/:id',  validacionData(deleteSchema , '/' ), deleteproducto );
router.post('/update/producto', validacionMulterOpcional , validacionData(Producto_schema_update, '/'), UpdateProducto );
module.exports = router;
