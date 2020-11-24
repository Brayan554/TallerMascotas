//Traer Modulos Internos 
const jwt = require("jsonwebtoken");

//Crear Fucncion de middleware
function auth (req, res, next){
    let jwtToken = req.header('Authorization');

    //barrer kjfdgfjdkgkjfdgCadena
    //Realizar Fucion Split Ya que viene con un espacio
    jwtToken = jwtToken.split(" ")[1];

    //Validar Si Hay Token 
    if(!jwtToken) return res.status(400).send("No Existe el Token Para Validar");

    //si exite el Token
    try {
        const payload = jwt.verify(jwtToken,"clave");
        req.usuario = payload;
        next();
    } catch (error) {
        res.status(400).send("Token No Valido Sin Autorizacion");
    }
}

// exports
module.exports = auth;