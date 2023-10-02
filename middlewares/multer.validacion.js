const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: 'public/img',
    filename: (req, file, cb) => {
        const nombreImagen = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, nombreImagen + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        const error = new multer.MulterError('archivo no permitido, vuelva a subir');
        error.field = file.fieldname;
        cb(error, false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 4 // 4MB
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});

const validacionMulter = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            upload.single('imagen')(req, res, function (err) {
                if (!req.file) {
                    reject(new Error('Se requiere un archivo o el archivo execede los limites permitidos'));
                } else if (err instanceof multer.MulterError) {
                    reject(err.code);
                } else if (err) {
                    reject(new Error(err.message));
                }
                resolve();
            });
        });
        next();
    } catch (error) {
      req.flash("menssages", [{type:'warning',message:[{msg: error.message }] }]  )
      return res.redirect('/productos');
    }
};



const validacionMulterOpcional = async (req, res, next) => {
    try {
      await new Promise((resolve, reject) => {
        upload.single('imagen')(req, res, function (err) {
          if (req.file === undefined) {
            resolve();
          } else if (err instanceof multer.MulterError) {
            reject(err.code);
          } else if (err) {
            reject(new Error(err.message));
          } else {
            resolve();
          }
        });
      });
      next();
    } catch (error) {
      req.flash("menssages", [{type:'warning',message:[{msg: error.message }] }]  )
      return res.redirect('/productos');
    }
  };


module.exports = {
    validacionMulter,
    validacionMulterOpcional    
};
