var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/pokemon');
mongoose.connect('mongodb://mongouser:mongo123@ds017862.mlab.com:17862/pokemon_caz');
console.log(mongoose);

var express = require('express');
var app = express();
var path = require('path');



app.get('/', function(req, res){
  res.sendFile(path.join(__dirname) + '/index.html');
});

//middleware


var adminRouter = require('./adminRouter.js');
app.use('/admin', adminRouter);


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'));
console.log('here we go!');
