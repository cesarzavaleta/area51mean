var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');


var port = process.env.PORT || 5000;

var app = express();

app.use(bodyparser.urlencoded({ extended:true}));
app.use(bodyparser.json());


app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Request-Width, content-type, Authorization');
	next();
});

app.use(morgan('dev'));


mongoose.connect('mongodb://mongouser:mongo123@ds017862.mlab.com:17862/pokemon_caz');
//mongoose.connect('mongodb://localhost/pokemon');
//mongoose.connect('mongodb://mongouser:mongo123@ds017862.mlab.com:17862/pokemon_caz');
console.log(mongoose);



// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname) + '/index.html');
// });

// var adminRouter = require('./adminRouter.js');
// app.use('/admin', adminRouter);

// var loginRouter = require('./loginRouter.js');
// app.use('/login', loginRouter);

var apiRouter = express.Router();

apiRouter.get('/', function(req, res){
	res.json({ message: 'stop to try to hit me and hit me'});
});

apiRouter.route('/users')
.post(function(req, res){
	var user = new User();
	for(var propname in req.body){
		user[propname] = req.body[propname];
	}
	user.username = req.body.username;
	user.name = req.body.name;
	user.password = req.body.password;
	user.save(function(err){
		//verify duplicate entry on username
		if(err && err.code == 11000){
			console.log(err);
			return res.json({ success: false, message: 'El nombre de usuario ya existe' });
		}
		return res.json({message: 'El usuario se ha creado'});
	});
})
.get(function(req, res){
	User.find(function(err, users){
		if(err) return res.send(err);
		res.json(users)
	})
});

app.use('/api', apiRouter);
app.set('port', port);

app.listen(port);
console.log('here we go!');





