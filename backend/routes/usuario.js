//Nuestros modulos Internos

const express = require("express");
const { restart } = require("nodemon");
const auth = require("../middleware/auth");
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

router.get("/listar", auth, async(req , res)=>{
    const usuario = await Usuario.findById(req.usuario._id);
    if(!usuario) return res.status(400).send("El Usuario No Se Encotro en la Base de Datos");
    res.send(usuario);
});

router.put("/", auth, async (req, res)=>{
    let usuario = await Usuario.findById(req.body._id);
    if(!usuario) return res.status(400).send("El Usuario No se encuentra en la base de datos");

    usuario = await Usuario.findByIdAndUpdate(
        req.body._id,
        {
            idUsuario: usuario._id,
            nombre: req.body.nombre,
            correo : req.body.correo,
            contrasena: req.body.contrasena, 
        },
        {
            new:true,
        }
    );
    res.status(200).send(usuario);
});

router.delete("/:_id", auth , async(req , res)=>{
    let usuario = await Usuario.findById(req.usuario._id);
    if(!usuario) return res.status(400).send("El Usuario No Existe En la Base De Datos");
    //si Existe
    
    usuario = await Usuario.findByIdAndDelete(req.params._id);
    res.status(200).send({message:"Eliminado Con Exito"});
    
  });
  

// Exports

module.exports = router;
