const prisma = require("../db/db");
const bcrypt = require("bcrypt");

const mostrarlogin = (req, res) => {
  res.render("login", {
    title: "Login",
  });
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
      console.log("Usuario no encontrado");
      return res.redirect("/login");
    }

    if (!bcrypt.compareSync(Password, FindUser.password)) {
      console.log("contraseña incorrecta");
      req.flash("menssages", 'error'  )
      return res.redirect("/login");
    }

    req.login(FindUser, (err) => {
      if (err) {
        throw err;
      }
      req.flash("menssages", 'nose'  )
      return res.redirect("/dashboard");
    });
  } catch (e) {       
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
    console.log(e.message);
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
