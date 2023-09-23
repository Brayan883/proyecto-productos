const express = require('express');
const { listarcategoria , createCategoria , updatecategoria , deleteCategoria } = require('../controllers/categoria.controller');
const router = express.Router();

const { validacionData } = require('../middlewares/validacion.schemas');
const { CategoriaSchema , CategoriaSchemaUpdate , deleteCategoriaSchema } = require('../schemas/categoria.schema');


router.get('/', listarcategoria );
router.post('/create', validacionData(CategoriaSchema, '/categoria')  ,createCategoria ) 
router.post('/update', validacionData(CategoriaSchemaUpdate, '/categoria')  ,updatecategoria );
router.get('/delete/:id',validacionData(deleteCategoriaSchema, '/categoria') ,deleteCategoria );
module.exports = router;
