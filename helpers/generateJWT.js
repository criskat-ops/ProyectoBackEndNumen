const jwt = require('jsonwebtoken')
require("dotenv").config()

const generateJWT = (body) =>{
    return new Promise((resolve, reject) =>{
        const payload = {body};

        jwt.sign( payload, process.env.TOKEN_SECRET,{
            expiresIn: process.env.TOKEN_EXPIRES_SECRET
            },
            (error, token)=>{
                if (error) {
                    console.log(error);
                    reject("Error al generar el TOKEN");
                } else {
                    resolve(token)
                }
            }
        )
    }) 
}

module.exports = { generateJWT }