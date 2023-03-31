const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

const { Cupon } = require('../models/cupon')
const { User } = require('../models/users')

const cuponController = {

    generarCupon: async (req, res) =>{
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                let newCupon = ""
                for (let i = 0; i < 5; i++) {      
                    newCupon += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
                }
                const uniqueCupon = await Cupon.findOne({cupon: newCupon})

                if (uniqueCupon) {
                    let i = 1
                    do {
                        i = i + 1
                        let newCupon = ""
                        for (let i = 0; i < 5; i++) {      
                            newCupon += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                        }
                        const uniqueCupon = await Cupon.findOne({cupon: newCupon})
                        if (!uniqueCupon) {
                            i = 0;
                        }
                    } while (i == 0);

                    const guardarCupon = new Cupon({
                        cupon: newCupon,
                        usuario_id: req.body.user_id,
                        valido: true
                    })
                    await guardarCupon.save()
                    res.status(201).json(guardarCupon)

                } else {

                    const guardarCupon = new Cupon({
                        cupon: newCupon,
                        usuario_id: req.body.user_id,
                        valido: true
                    })
                    await guardarCupon.save()
                    res.status(201).json(guardarCupon)
                }
            } else {
                res.status(501).json({msg: 'Error'})
            }
        } catch (error) {
            res.status(501).json({msg: 'No se puede generar el cupon solicitado..', error})
        }
    },
    verCupones: async (req, res) =>{
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const mostrarCupones = await Cupon.find({usuario_id: req.body.user_id, valido: true})
                res.status(200).json({ mostrarCupones })
            } else {
                res.status(501).json({msg: err})
            }

        } catch (error) {
            res.status(501).json({msg: 'No se puede mostrar los registros...', error})
        }
    },
    registroUserWithCupon: async (req, res) =>{
        //try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const uniqueEmail = await User.findOne({email: req.body.email})
                if (uniqueEmail) {
                    return res.status(400).json({ msg: "El EMAIL ya está registrado..." })
                }
                let salt = bcrypt.genSaltSync(10)
                const guardarUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, salt),
                    cupon: req.body.cupon,
                    descuento: req.body.descuento,
                })
                await guardarUser.save()
                const editCupon = await Cupon.findOne({cupon: req.body.cupon})
                await Cupon.findByIdAndUpdate(editCupon._id, { valido: false })
                res.status(201).json(guardarUser)
            } else {
                res.status(501).json(err)
            }
        /*} catch (error) {
            res.status(501).json({msg: 'No se pudo registrar al usuario con el cupón...', error})
        }*/
    }

}

module.exports = cuponController