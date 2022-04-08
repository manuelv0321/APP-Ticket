const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const UsuarioController = require('../controllers/usuariosController');

//middelware para proteger rutas
const auth = require('../middelware/auth');

module.exports = function(){

     //muestra un cliente por id
     router.get('/clientes',     
         clienteController.obtenerClientes);

     router.get('/Ticket',  
        auth,   
        clienteController.obtenerTickets);
    
    router.get('/Ticket/:id',  
        auth,   
        clienteController.obtenerTicket);

    router.get('/Usuario/:username',       
         UsuarioController.verificarusuario);

     router.post('/TicketUpdate', 
         auth,
         clienteController.ActualizarTicket);

     router.post('/Tickets', 
         auth,
         clienteController.nuevoTicket);

    router.post('/Ticket/',
        auth,
        clienteController.FinalizarTicket);
    
    router.post('/Report/',
        auth,
        clienteController.Report);

    //agregar nuevos clientes via POST
  /*  router.post('/clientes', 
    auth,
    clienteController.nuevoCliente);

    //mostrar todos los clientes
    router.get('/clientes',
    auth,
    clienteController.obtenerClientes);

    //muestra un cliente por id
    router.get('/clientes/:idcliente',
    auth,
    clienteController.obtenerCliente);

    //actualizar un registro
    router.put('/clientes/:idcliente',
    auth,
    clienteController.actualizaCliente);

    //eliminar un cliente
    router.delete('/clientes/:idcliente',
    auth,
    clienteController.eliminarCliente);

    
 

    //nuevos productos
    router.post('/productos',
        auth,
        ProductoController.subirArchivo,
        ProductoController.nuevoProducto
    );

    //mostrar los productos
    router.get('/productos',
    auth,
    ProductoController.mostrarProducto);

    //mostrat por producto especifico
    router.get('/productos/:idproducto', 
    auth,
    ProductoController.obtenerProducto);

    //actualizar producto
    router.put('/productos/:idproducto',
    auth,
    ProductoController.subirArchivo,
    ProductoController.actualizaProductos);  
    //eliminar un producto
    router.delete('/productos/:idproducto',
    auth,
    ProductoController.eliminarProducto);
    
     //busqueda de producto
    router.post('/productos/busqueda/:query',
    auth,
    ProductoController.BuscarProducto);
    

   


    //pedidos

    //agregar pedidos
    router.post('/pedidos/nuevo/:idUsuario',
    auth,
    PedidosController.nuevoPedidos);
    //mostrar pedidos
    router.get('/pedidos',
    auth,
    PedidosController.mostrarPedidos);
    //mostrar pedido
    router.get('/pedidos/:idpedido',
    auth,
    PedidosController.mostrarPedido);
    //actualizar pedido
    router.put('/pedidos/:idpedido',
    auth,
    PedidosController.actualizarPedido);
    //eliminar pedido
    router.delete('/pedidos/:idpedido',
    auth,
    PedidosController.eliminarPedido);*/


    //usuarios
    router.post('/crear-cuenta',UsuarioController.registrarUsuario);
    router.post('/iniciar-session',UsuarioController.autenticarUsuario);

    return router;
}