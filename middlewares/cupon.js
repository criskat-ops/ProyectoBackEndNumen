const { Cupon } = require("../models/cupon");

const validateCupon = async (req, res, next) => {
  try {
    const cupon = await Cupon.findOne({cupon: req.body.cupon});
    if (cupon == null) {
      res
        .status(404)
        .json({ msg: "El cupon ingresado no se encuentra en la base de datos." });
    } else {
      if (cupon.valido === true) {
        next();
      }else{
        res
        .status(400)
        .json({ msg: "El cupon ingresado ya fue usado" });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "El cupón es inválido, revíselo y vuelva a intentarlo",
      error,
    });
  }
};


module.exports = { validateCupon };