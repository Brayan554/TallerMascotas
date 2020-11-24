//Nuestros modulos Internos

const express = require("express");
const router  = express.Router();

//Modulos Propios Creados 
const { Usuario } = require("../model/usuario");

//Rutas 

router.post("/", async(req , res) => {

    //revizar si el usuario exite en la bd 
    let usuario = await Usuario.findOne({correo: req.body.correo});

    //si existe en la db 

    if(!usuario) return res.status(400).send("Correo o Contraseña Incorrectas, Verifique sus Credenciales");
    
    // si exite el usuario validamos la contrasena
    if(usuario.contrasena !== req.body.contrasena) return res.status(400).send("Correo o Contraseña Incorrectas, Verifique sus Credenciales");

    //si pasa generamos el jwt 
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken});
});

//exports
module.exports = router;



