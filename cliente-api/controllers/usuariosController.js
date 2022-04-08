
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registrarUsuario = async (req,res)=>{

    //console.log(req.body);
   let now= new Date();
   let name =  req.body.name;
   let lastname = req.body.lastname;
   let password = await bcrypt.hash(req.body.password, 12);
   let username = req.body.username;

    
   db.connect(function(err) {

    if (err) throw err;
   
    var sql = `INSERT INTO user (name,lastname,username,password,date_created,status) VALUES ('${name}','${lastname}','${username}','${password}',now(),'Active')`;
        db.query(sql, function (err, result) {
        if (err) throw err;
            res.json("1 record inserted");
        });
  });

}

exports.verificarusuario = async (req,res)=>{

    db.connect(function(err) {

        if (err) throw err;

    db.query(`SELECT count(*) as cantidad FROM user where username = '${req.params.username}'`, function (err, rows, fields) {
        // Call reject on error states,
        // call resolve with results
        if (err) {
            return (err);
        }
       res.json(rows[0])
    
      });
    });


}




exports.autenticarUsuario = async (req,res,next)=>{

    //buscar usuario
    const {username,password}= req.body;
    const usuario =   await verificar_usuario(username);

    //console.log(req.body);
   // const usuario = await Usuario.findOne({email});

    if(usuario==''){

        await res.status(401).json({mensaje: 'Este Usuario No Existe'});
        next();

    }else{

       
        
       
        const passwordMatch = await bcrypt.compare(password,usuario[0].password);

      
        if(passwordMatch ===false){

            res.status(401).json({mensaje: 'Password incorrecto'});
            next();
        }else{

            //si el password es correcto

            const token = jwt.sign({
                email: usuario[0].username,
                nombre: usuario[0].name,
                id: usuario[0].id
            }, 'LLAVESECRETA',
            {
                expiresIn: '1h'
            });

            res.json({token});

           
        }

    

    }
    
}

async function verificar_usuario(usuario){

    return Promise.resolve({
        
        
      
        then: function(resolve, onReject) { 
            
            db.query(`SELECT * FROM user where username = '${usuario}'`, function (err, rows, fields) {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return onReject(err);
                }
                resolve(rows);
            
              });
             }
        
      });

}