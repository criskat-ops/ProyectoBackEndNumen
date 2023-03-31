const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cuponSchema= new Schema(
    {
        cupon:{
            type: String,
            required: true,
            unique: true,
        },
        usuario_id: {
            type: String,
            required: true,
        },
        valido: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Cupon = mongoose.model('Cupon', cuponSchema)

module.exports = {Cupon}