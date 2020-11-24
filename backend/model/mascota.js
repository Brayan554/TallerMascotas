//Crear Esquema Mongoose
const mongoose = require("mongoose");

//esquema Tarea
const esquemaMascota = new mongoose.Schema({
    idUsuario:String,
    nombre:String, 
    tipo:String,
    descripcion:String,
    fecha:{
        type:Date,
        default: Date.now,
    },
});

// export
const Mascota = mongoose.model("mascota", esquemaMascota);
module.exports.Mascota = Mascota;