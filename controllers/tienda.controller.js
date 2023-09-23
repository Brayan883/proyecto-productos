const prisma = require("../db/db");
const mercadopago = require('mercadopago')

const listarProductos = async (req, res) => {
  try {
    async function consultarProductos() {
      try {
        return await prisma.producto.findMany({
          select: {
            IdProducto: true,
            Nombre: true,
            imagen: true,
            precio: true,
            stock: true,
            cantidad: true,
            Descripcion: true,
            categoriaId: true,
          },
        });
      } catch (error) {
        throw error;
      }
    }

    async function consultarCategorias() {
      try {
        return await prisma.categoria.findMany({
          select: {
            IdCategoria: true,
            Nombre: true,
          },
        });
      } catch (error) {
        throw error;
      }
    }

    async function consultarUltimasCategorias() {
      try {
        return await prisma.categoria.findMany({
          take: 3,
          select: {
            IdCategoria: true,
            Nombre: true,
          },
          orderBy: {
            fechaCreacion: 'desc',
          },
        });
      } catch (error) {
        throw error;
      }
    }

    const [MostrarProducto, mostrarCategoria, mostrarUltimaCategorias] = await Promise.all([
      consultarProductos(),
      consultarCategorias(),
      consultarUltimasCategorias(),
    ]);



    res.render('tienda', {
      title: 'tienda',
      MostrarProducto,
      mostrarCategoria,
      mostrarUltimaCategorias
    });
  } catch (e) {
    console.log(e.message)
    res.redirect('/tienda')
  } finally {
    prisma.$disconnect()
  }
}

const createOrders = async (req, res) => {
  try {
    const dataFromFrontend = req.body
    mercadopago.configure({
      access_token: 'TEST-726680436002058-071016-37a8cafad4285db856d9b8832d43bf95-1419533159'
    })
    
    const result = await mercadopago.preferences.create({
      items:  dataFromFrontend.map(item => ({
        title: item.Nombre,
        description: '',
        unit_price: item.Precio,
        currency_id: 'COP',
        quantity: item.Cantidad,
        picture_url: 'https://images.pexels.com/photos/5946083/pexels-photo-5946083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      })),
      back_urls: {
        success: 'http://localhost:3000/tienda',
        failure: 'http://localhost:3000/tienda',
        pending: 'http://localhost:3000/tienda'
      },
      notification_url: 'https://a482-200-69-74-34.ngrok-free.app/tienda/payment',
    })  
     const paymentURL = result.body.init_point;               
     return res.json({paymentURL});
  } catch (e) {
    console.log(e.message);
   return res.redirect('/tienda')
  }
}

const DataPayment = async (req, res) => {
  try {
    const result = req.query  
    console.log(result);
    if (result.type === 'payment' ) {
    const data = await mercadopago.payment.findById(result['data.id'])
    console.log(data);
    }
   return res.sendStatus(204)  
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}

module.exports = {
  listarProductos,
  createOrders,
  DataPayment
}