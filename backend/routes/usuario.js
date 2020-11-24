//Nuestros modulos Internos

const express = require("express");
const router  = express.Router();

//Modulos Propios Creados 
const { Usuario } = require("../model/usuario");

//Rutas 

router.post("/", async(req , res) => {

    //revizar si el usuario exite en la bd 
    let usuario = await Usuario.findOne({correo: req.body.correo})

    //si existe en la db 

    if(usuario) return res.status(400).send("El Usuario YA Exite en la base de datos")

    // si el usuario no exite continua el porceso 
    usuario = new Usuario({
        nombre:   req.body.nombre,
        correo:   req.body.correo,
        contrasena: req.body.contrasena,
    });

    // guardar el usuario en la base de datos y generarmos el token de autenticacion
    const result     = await usuario.save();
    const jwToken    = usuario.generateJWT();
    res.status(200).send({jwToken});
});

// Exports

module.exports = router;
