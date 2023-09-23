const express = require('express');
const { listarProductos , createOrders , DataPayment } = require('../controllers/tienda.controller');
const router = express.Router();

router.get('/', listarProductos );
router.post('/createOrders', createOrders );
router.post('/payment', DataPayment );

module.exports = router;