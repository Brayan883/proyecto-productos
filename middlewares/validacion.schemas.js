const { z } = require("zod");
const validacionData = (schema, routeName) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {           
      req.flash("menssages", [
        { type: "warning", message: [{ msg: error.issues[0].message }] },
      ]);      
      return res.redirect(routeName);
    }
    req.flash("menssages", [
      { type: "warning", message: [{ msg: error.message }] },
    ]);    
    return res.redirect(routeName);
  }
};

module.exports = {
  validacionData,
};
