const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next(); //Sigue con el siguiente middleware, es decir sigue con el siguiente check(), si no, pasa al controller.
};

module.exports = {
  validarCampos,
};
