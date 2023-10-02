const prisma = require("../db/db");
const bcrypt = require("bcrypt");

const mostrarlogin = (req, res) => {
  try {
    return res.render("login", {
      title: "Login",
    });  
  } catch (error) {
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
    res.redirect('/login');
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const FindUser = await prisma.user.findUnique({
      where: {
        email: Email,
      },
    });

    if (!FindUser) {
      req.flash("menssages", [{type:'warning',message:[{msg: 'Usuario no encontrado' }] }]  )
      return res.redirect("/login");
    }

    if (!bcrypt.compareSync(Password, FindUser.password)) {
      req.flash("menssages", [{type:'warning',message:[{msg: 'Contraseña incorrecta' }] }]  )
      return res.redirect("/login");
    }

    req.login(FindUser, (err) => {
      if (err) {
        throw err;
      }     
      return res.redirect("/productos");
    });
  } catch (e) {       
    req.flash("menssages", [{type:'warning',message:[{msg: e.message }] }]  )
    return res.redirect("/dashboard");
  } finally {
    prisma.$disconnect();
  }
};

const logoutCerrar = (req, res) => {
  try {
    req.logout(function (err) {      
      if (err) {
        console.error(err.message);
        return res.status(500).json({
          message: "Error al cerrar la sesión",
        });
      }
      return res.status(200).json({
        message: "Sesión cerrada",
      });
    });
  } catch (e) {    
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }  
};

module.exports = {
  login,
  mostrarlogin,
  logoutCerrar,
};
