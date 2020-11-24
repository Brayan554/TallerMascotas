//modulos Internos
const express  = require("express");
const mongoose = require("mongoose");

//Modulos Creados 
const usuario  = require("./routes/usuario");
const auth     = require("./routes/auth");
const mascota  = require("./routes/mascota");

//app
const app = express();
app.use(express.json());


//Definir Rutas 
app.use("/api/usuario",usuario);
app.use("/api/auth", auth);
app.use("/api/mascota", mascota);

//puerto De Ejecucion
const port = process.env.PORT || 3002;
app.listen(port, () => console.log("su Puerto es :" + port));
mongoose.connect("mongodb://localhost/TallerMascotas",{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
.then(()=> console.log("conexion a Mongo Ok"))
.catch((error)=>console.log("conexion Off"));

