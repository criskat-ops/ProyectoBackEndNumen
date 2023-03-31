var express = require("express")
var router = express.Router()
const AController = require('../controllers/accessController')
const authSession = require('../middlewares/authSession')
const authJWT = require('../middlewares/authJWT')

const { check } = require("express-validator")

router.post("/nuevousuario",[
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
    ],
    AController.registerUser
)
router.post(
    "/login",
    [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Debes ingresar un email")
        .isEmail()
        .withMessage("Debes ingresar un formato de email válido"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Debes ingresar una contraseña"),
    ],
    AController.login
)
router.get("/logout", authSession, authJWT, AController.logout);

module.exports = router;