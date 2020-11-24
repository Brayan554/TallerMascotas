//Modulos Internos
const mongoose = require("mongoose");
const jwt      = require("jsonwebtoken");


//Realizar Esquema Usuario 
const esquemaUsuario = new mongoose.Schema({
    nombre:String,
    correo:String,
    contrasena:String 
});

//Generar el Json Web Toke 
esquemaUsuario.methods.generateJWT = function(){
    return jwt.sign({
        _id:this._id,
        nombre:this.nombre,
        correo:this.correo,
    },"clave");
};

//export
const Usuario = mongoose.model("usuario", esquemaUsuario);
module.exports.Usuario = Usuario;
module.exports.esquemaUsuario = esquemaUsuario;
