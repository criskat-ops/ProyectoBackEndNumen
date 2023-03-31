const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema= new Schema(
    {
        name:{
            nombres:{
                type: String,
                required: true
            },
            apellidos:{
                type: String,
                required: true
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cupon: {
            type: String,
            //required: true
        },
        descuento: {
            type: Number,
            //required: true
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = {User}