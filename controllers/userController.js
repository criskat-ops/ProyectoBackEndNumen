const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

const { User } = require('../models/users')


const userController = {


    editPasswordUser: async (req, res) =>{
        try {
            const error = validationResult(req)
            if (error.isEmpty()) {
                const id = req.body.user_id
        
                const usuario = await User.findById(id)

                if (!bcrypt.compareSync(req.body.oldPassword, usuario.password)) {
                    res.status(401).json({msg: 'La contraseña antigua es incorrecta...'})
                }

                let salt = bcrypt.genSaltSync(10);
                let newPassword = bcrypt.hashSync(req.body.newPassword, salt)
        
                await User.findByIdAndUpdate(id, { password: newPassword })
        
                res.status(202).json({ msg: "Contraseña actualizada,,," })
              } else {
                res.status(501).json(error)
              }
        } catch (error) {
            res.status(501).json({
                msg: "No se pudo editar la contraseña...", error 
            })
        }
    },
    eliminarUser: async (req, res) =>{
        try {
            const id = req.body.user_id

            const userDelete = await User.findByIdAndDelete(id);
            res.status(202).json({ msg: "Usuario eliminado...", userDelete });
        } catch (error) {
            res.status(400).json({
                msg: "No se pudo eliminar al usuario...", error 
            })
        }
    }


}

module.exports = userController
