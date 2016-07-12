  var express = require('express');
  var adminRouter = express.Router();

adminRouter.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

adminRouter.param('name', function(req, res, next, name){
  console.log('req.name', req.params.name);
  console.log('name: ', name);
  req.name = 'adjfalñskjdlf';
  next();
});

  adminRouter.get('/', function(req, res){
    res.send('Estoy en la página principal');
  });
  adminRouter.get('/users', function(req, res){
    res.send('Aquí se mostrarán los usuarios');
  });
  adminRouter.get('/posts', function(req, res){
    res.send('Aquí se mostrarán los artículos');
  });
  adminRouter.get('/users/:name', function(req, res){
    res.send('Hola ' +  req.name);
  });
  module.exports = adminRouter;
