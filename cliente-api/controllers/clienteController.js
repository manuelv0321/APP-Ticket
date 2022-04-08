const db = require('../config/db');

exports.obtenerClientes = async (req,res,next)=>{

    try {

        db.query('SELECT * FROM user', function (error, results, fields) {

            if (error)
                throw error;


                res.json(results);
        
        
        });

   } catch (error) {

       console.log(error);
       next();

   }

}

exports.obtenerTickets = async (req,res,next)=>{

    try {

        db.query(`select  * from  ticket where status='Open'`, function (error, results, fields) {

            if (error)
                throw error;


                res.json(results);
        
           /* results.forEach(result => {
                res.json(result);
            });*/
        });

   } catch (error) {

       console.log(error);
       next();

   }

}

exports.obtenerTicket = async (req,res,next)=>{

    try {

        db.query(`select  * from  ticket where id=${req.params.id}`, function (error, results, fields) {

            if (error)
                throw error;
            

                res.json(results);
        
           /* results.forEach(result => {
                res.json(result);
            });*/
        });

   } catch (error) {

       console.log(error);
       next();

   }

}



       


exports.nuevoTicket = async (req,res,next)=>{

   // console.log(req.body.cliente["Subject"]);

    try {

        db.query(`INSERT INTO ticket (date,subject,description,dateend,hours,status) values('${req.body.cliente["start"]}','${req.body.cliente["Subject"]}','${req.body.cliente["Description"]}','${req.body.cliente["dateend"]}', ${req.body.cliente["hour"]},'Open' )`, function (error, results, fields) {

            if (error)
                throw error;

                db.query('select last_insert_id() as last', function (error, result, fields) {

                    if (error)
                        throw error;
        
        
                       let last = result[0].last;
                
                       req.body.Usuarios.forEach(Usuarios => {
                        db.query(`INSERT INTO ticket_user (ticket_id,user_id) values(${last},${Usuarios} )`, function (error, resultado, fields) {

                            if (error)
                                throw error;
                         
                               
                    });
                });
            });
                res.json(results);
        
         
        });

   } catch (error) {

       console.log(error);
       next();

   }

}


exports.FinalizarTicket = async (req,res,next)=>{

    //console.log(req.body.id)

    try {

        db.query(`UPDATE ticket SET status='Closed' where id=${req.body.id}`, function (error, results, fields) {

            if (error)
                throw error;


                res.json(results);
        
           /* results.forEach(result => {
                res.json(result);
            });*/
        });

   } catch (error) {

       console.log(error);
       next();

   }
    
}


exports.Report = async (req,res,next)=>{


    let condicion = '';

    if(req.body.estado ==0){
        condicion='AND 1=1';
    }else if(req.body.estado ==1){
        condicion="AND t.status='Open'";
    }else{
        condicion="AND t.status='Open'";
    }

   

    //select t.id,cast(t.date as date) as date,t.subject,t.description,u.id as user_id,u.name from ticket t left join ticket_user tu on tu.ticket_id = t.id left join user u on u.id = tu.user_id
 
    try {

        db.query(`select distinct t.id,cast(t.date as date) as date,cast(t.dateend as date) as enddate,t.hours,t.subject,t.description,u.id as user_id,u.name from ticket t left join ticket_user tu on tu.ticket_id = t.id left join user u on u.id = tu.user_id
        where cast(t.date as date) between '${req.body.fechas["start"]}' and '${req.body.fechas["dateend"]}' ${condicion}`, function (error, results, fields) {

            if (error)
                throw error;


                res.json(results);
        
           
        });

   } catch (error) {

       console.log(error);
       next();

   }
    
}


exports.ActualizarTicket = async (req,res,next)=>{

    var moment = require('moment'); // require
  
   let date = moment.utc(req.body.date).format('YYYY-MM-DD');
   let dateend = moment.utc(req.body.dateend).format('YYYY-MM-DD');
  
    

   try {

        db.query(`UPDATE ticket SET date='${date}',dateend='${dateend}',subject='${req.body.subject}',description='${req.body.description}',hours=${req.body.hours} where id=${req.body.id}`, function (error, results, fields) {

            if (error)
                throw error;
 

              res.json(results);
          //  console.log(`UPDATE ticket SET date='${date}',dateend='${dateend}',subject='${req.body.subject}',description='${req.body.description}',hours=${req.body.hours} where id=${req.body.id}`)
           
        });

   } catch (error) {

       console.log(error);
       next();

   }
    
}

