const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

const { User } = require('../models/users')
const { generateJWT } = require('../helpers/generateJWT')


const AController = {
    registerUser: async (req, res) =>{
        try {
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
                    cupon: '',
                    descuento: 0,
                })
                await guardarUser.save()
                res.status(201).json(guardarUser)
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json({
                msg: "No se pudo registrar al usuario...", error 
            })
        }
    },
    login: async (req, res) =>{
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email})
                if (usuario == null) {
                    res.status(401).json({msg: 'El email o la contraseña son incorrectos'})
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.status(401).json({msg: 'El email o la contraseña son incorrectos'})
                }

                const token = await generateJWT({
                    id: usuario._id,
                    name: usuario.name
                })
                const userSession = {
                    _id: usuario._id,
                    name: usuario.name,
                    email: usuario.email,
                    token: token,
                }

                res.cookie("_sessionbe", userSession, {maxAge: 60000 * 60 * 24 * 15})
                req.session.user = userSession;

                res.status(201).json({ userSession, logger: true, msg: 'Login Exitoso...' })
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json({
                msg: "No se pudo iniciar sesión, intente mas tarde...", error 
            })
        }
    },
    logout: async (req, res) =>{
        const usuario = req.cookies._sessionbe

        res.clearCookie('_sessionbe')
        req.session.destroy()
        res.status(200).json({ logger: false, msg: 'Logout Exitoso...'})
    }
}

module.exports = AController 