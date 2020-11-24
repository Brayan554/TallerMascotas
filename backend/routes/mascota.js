const express = require("express");
const router  = express.Router();

//Modulos Propios Creados 
const { Usuario } = require("../model/usuario");
const { Mascota } = require("../model/mascota");

//middleware
const auth = require("../middleware/auth");

//Rutas
router.post("/", auth, async (req , res)=>{

    //Traer Usuario Para Extraer El Id y Ponerlo en el esqeuma de mascota
    const usuario = await Usuario.findById(req.usuario._id);
    //Si el Usuario No Existe 
    if(!usuario) return res.status(400).send("el Usuario No Se Existe");

     let mascota = await Mascota.findOne({tipo: req.body.tipo})
     if(mascota) return res.status(400).send("El Tipo De Mascota Ya se Encuentra Ingrese Otra Diferente");

     mascota = new Mascota({
        idUsuario: usuario._id,
        nombre: req.body.nombre, 
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
    });
    const result = await mascota.save();
    res.status(200).send(result);
});

// export

module.exports = router;
