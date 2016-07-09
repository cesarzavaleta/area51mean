var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname) + '/index.html');
});

app.listen(80);
console.log('here we go!');
