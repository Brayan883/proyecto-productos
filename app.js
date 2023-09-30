const createError = require("http-errors");
const express = require("express");
const path = require("path");
const layout = require("express-ejs-layouts");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const flash = require("express-flash");

require("dotenv").config();

const ProductoRouter = require("./routes/Productos");
const CategoriaRouter = require("./routes/Categoria");
const TiendaRouter = require("./routes/tienda");
const UsuariosRouter = require("./routes/Usuario");
const UsuariosDashboard = require("./routes/Dashboard");
const UsuariosLogin = require("./routes/login");

const { options } = require("./config");
const prisma = require("./db/db");
const sessionStore = new MySQLStore(options);
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(layout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    try {
      cb(null, { id: user.idUser, username: user.username });
    } catch (error) {
      cb(error, null);
    }
  });
});

passport.deserializeUser(function (userdata, cb) {
  process.nextTick(async function () {
    try {
      const user = await prisma.user.findUnique({
        where: {
          idUser: parseInt(userdata.id),
        },
      });

      if (!user) return cb(null, null);

      cb(null, { id: user.idUser, username: user.username });
    } catch (error) {
      cb(error, null);
    }
  });
});

app.use(
  helmet({
    contentSecurityPolicy: false,
    xssFilter: true,  
  })
);

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(helmet.permittedCrossDomainPolicies());


app.use(function (req, res, next) {   
  res.locals.mensajes = req.flash('menssages')      
  next();
});

app.use("/", TiendaRouter);
app.use("/productos", ProductoRouter);
app.use("/categoria", CategoriaRouter);
app.use("/usuarios", UsuariosRouter);
app.use("/dashboard", UsuariosDashboard);
app.use("/login", UsuariosLogin);

app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

sessionStore
  .onReady()
  .then(() => {
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    console.error(error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}/`);
});
