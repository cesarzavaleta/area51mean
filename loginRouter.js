
var express = require('express');
var loginRouter = express.Router();

loginRouter.param('usr', function(req, res, next, usr){
  var valid =    req.params.usr == 'cesar'
              && req.params.pwd == '12345';
  req.valid = valid;
  req.userName = req.params.usr;
  next();
});

loginRouter.get('/:usr/:pwd', function(req, res){
  if(req.valid)
    res.redirect(302, '/admin');
  else
    res.sendStatus(401);
});



module.exports = loginRouter;
