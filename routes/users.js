var express = require("express")
var router = express.Router()

const userController = require('../controllers/userController')

const authSession = require('../middlewares/authSession')
const authJWT = require('../middlewares/authJWT')
const { validateId, validateId2 } = require('../middlewares/validateId')

const { check } = require("express-validator")

router.post('/edituserpass',
[
    check('user_id')
      .not()
      .isEmpty()
      .withMessage('Ingresa un ID de usuario'),
    check("oldPassword")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña")
      .isLength({ min: 6, max: 15 })
      .withMessage("La contraseña debe contener entre 6 a 15 caracteres."),
    check("newPassword")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña")
      .isLength({ min: 6, max: 15 })
      .withMessage("La contraseña debe contener entre 6 a 15 caracteres."),
], authSession, authJWT, validateId2, userController.editPasswordUser)

router.post('/deleteuser',
[
  check('user_id')
    .not()
    .isEmpty()
    .withMessage('Ingresa un ID de usuario'),

], authSession, authJWT, validateId2, userController.eliminarUser)

module.exports = router;
