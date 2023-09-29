const prisma = require("../db/db");
const bcrypt = require("bcrypt");

const mostrarlogin = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const FindUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!FindUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (!bcrypt.compareSync(password, FindUser.password))
      return res.status(400).json({ message: "contraseña incorrecta" });

    req.login(user, (err) => {
      if (err) {
        throw err;
      }
      return res.redirect("/dashboard");
    });
  } catch (e) {
    console.log(e.message);
    return res.redirect("/");
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  login,
  mostrarlogin,
};
