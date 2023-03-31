const mongoose = require('mongoose')

const conect = async () =>{
    try {
        await mongoose.connect('mongodb+srv://criskat:criskat0512@cluster0.uoqttv1.mongodb.net/test')
        console.log('Conexión Exitosa a la Base de Datos')
    } catch {
        console.log('Error al Conectar')
    }
}

module.exports = { conect }