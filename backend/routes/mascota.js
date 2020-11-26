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

router.get("/Listar", auth , async(req, res)=>{

        const usuario = await Usuario.findById(req.usuario._id);
        if(!usuario) return res.status(400).send("El Usuario No exite En La Bd");

        const mascota = await Mascota.find({idUsuario : req.usuario._id});
        res.send(mascota);
});


//Editar Listar SolaMente Una Mascota Edit
router.put("/", auth , async(req, res)=>{
    const usuario = await Usuario.findById(req.usuario._id);
    if(!usuario) return res.status(400).send("El Usuarion No Existe en la bd");
    //si el usuario Existe 

    const mascota = await Mascota.findByIdAndUpdate(
        req.body._id,
        {
            idUsuario: usuario._id,
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
        },
        {   
            //para que me refresque 
            new:true,
        }
    );
    //Validar Si No Existe la mascota
    if(!mascota) return res.status(400).send("El Usuario No Tiene Mascotas");
     
    //si exiten tareas las devolvemos   
    res.status(200).send(mascota);
    
});

//Metodo Para eliminar Mascota 
router.delete("/:_id", auth , async(req , res)=>{
  const usuario = await Usuario.findById(req.usuario._id);
  if(!usuario) return res.status(400).send("El Usuario No Existe En la Base De Datos");
  //si Existe

  const mascota = await Mascota.findByIdAndDelete(req.params._id);
  if(!mascota) return res.status(400).send("No Tiene Mascotas Para Eliminar");
  res.status(200).send({message:"Mascota Eliminada Correctamente"});
});

    
// export
module.exports = router;
