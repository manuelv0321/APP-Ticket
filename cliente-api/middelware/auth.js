const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{

    //autorización por el header

    const authHeader = req.get('Authorization');

    if(!authHeader){

        const error = new Error('No Autenticado, no hay JWT');
        error.statusCode =401;
        throw error;

        /*res.json('No Autenticado, no hay JWT');
        next();*/
    }

    //obtener token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;

    try {

        revisarToken = jwt.verify(token, 'LLAVESECRETA');
        
    } catch (error) {
        error.statusCode =500;
        throw error;
    }

    //revisar si es valido pero hay algun error de expirado

    if(!revisarToken){
        
        const error = new Error('No Autenticado');
        error.statusCode =401;
        throw error;
    }

    //si pasa todas las verificaciones
    next();

}