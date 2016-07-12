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
