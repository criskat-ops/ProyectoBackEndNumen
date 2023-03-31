var express = require("express")
var router = express.Router()

const cuponController = require('../controllers/cuponController')
const authSession = require('../middlewares/authSession')
const authJWT = require('../middlewares/authJWT')
const { validateId2 } = require('../middlewares/validateId')
const { validateCupon } = require('../middlewares/cupon')

const { check } = require("express-validator")

router.post('/generarcupon',
[
    check('user_id')
      .not()
      .isEmpty()
      .withMessage('Ingresa un ID de usuario')
], authSession, authJWT, validateId2, cuponController.generarCupon)

router.get('/miscupones', [
    check('user_id')
      .not()
      .isEmpty()
      .withMessage('Ingresa un ID de usuario')
], authSession, authJWT, validateId2, cuponController.verCupones)

router.post('/registrarconcupon', [
    check("name.nombres").not().isEmpty().withMessage("Debes ingresar un nombre"),
    check("name.apellidos").not().isEmpty().withMessage("Debes ingresar un apellido"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña")
      .isLength({ min: 6, max: 15 })
      .withMessage("La contraseña debe contener entre 6 a 15 caracteres."),
    check("cupon")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un Cupón"),
    check("descuento")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un Descuento"),
], validateCupon, cuponController.registroUserWithCupon)

module.exports = router