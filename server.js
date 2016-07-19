var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var Pokemon = require('./models/pokemon');

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

apiRouter.route('/users/:user_id')
.get(function(req, res){
	User.findById(req.params.user_id, function(err, user){
		if(err) return res.send(err);
		if (user) {
			res.json(user);
			return;
		}
		res.sendStatus(404);
	});

})
.put(function(req,res){
	User.findById(req.params.user_id, function(err, user){
		if(err) return res.send(err);
		if (user) {
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			user.save(function(error){
				if(err) return res.send(err);
				res.json({message: 'Usuario actualizdo'});
			});
			return;
		}
		res.sendStatus(404);		
	});
	
})
.delete(function(req, res){
	User.remove({ _id: req.params.user_id}, function(err, user){
		if(err) return res.send(err);
		res.json({message: 'El usuario fue eliminado'});
	})
});





apiRouter.route('/pokemons')
.post(function(req, res){
	var pokemon = new Pokemon();
	for(var propname in req.body){
		pokemon[propname] = req.body[propname];
	}
	pokemon.pokemonname = req.body.pokemonname;
	pokemon.name = req.body.name;
	pokemon.password = req.body.password;
	pokemon.save(function(err){
		//verify duplicate entry on pokemonname
		if(err && err.code == 11000){
			console.log(err);
			return res.json({ success: false, message: 'El nombre de usuario ya existe' });
		}
		return res.json({message: 'El usuario se ha creado'});
	});
})
.get(function(req, res){
	Pokemon.find(function(err, pokemons){
		if(err) return res.send(err);
		res.json(pokemons)
	})
});

apiRouter.route('/pokemons/:pokemon_id')
.get(function(req, res){
	Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
		if(err) return res.send(err);
		if (pokemon) {
			res.json({ message: pokemon.sayHi()});
			return;
		}
		res.sendStatus(404);
	});

})
.put(function(req,res){
	Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
		if(err) return res.send(err);
		if (pokemon) {
			if (req.body.name) pokemon.name = req.body.name;
			if (req.body.type) pokemon.type = req.body.type;
			pokemon.save(function(error){
				if(err) return res.send(err);
				res.json({message: 'Pokemon actualizdo'});
			});
			return;
		}
		res.sendStatus(404);		
	});
	
})
.delete(function(req, res){
	Pokemon.remove({ _id: req.params.pokemon_id}, function(err, pokemon){
		if(err) return res.send(err);
		res.json({message: 'El pokemon fue eliminado'});
	})
});



app.use('/api', apiRouter);
app.set('port', port);

app.listen(port);
console.log('here we go!');


// var x = Object.getOwnPropertyNames(User)
// for (var i = 0 - 1; i < x.length; i++) {
// 	console.log(x[i]);
// }
// console.log('-----------')
// for(var p in User){
// 	console.log(p);
// }
 console.log('-----------')
console.log(Pokemon.schema.paths);



