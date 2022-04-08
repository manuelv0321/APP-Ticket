const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-Parser');

//cors permite que un cliente se conecte a otro servidor

const cors = require('cors')



//crear app
const app = express();

//habilitar body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//habilitar cors
app.use(cors());

//rutas de la app
app.use('/', routes());


app.listen(5000);