//Packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Pokemon Schema
var PokemonSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: { unique: true}
	},
	type: {
		type: String,
		required:true
	},
	count:{
		type: Number,
		default: 0
	}
});
PokemonSchema.methods.sayHi = function(){
	var pokemon = this;
	return 'Hola! soy un ' + pokemon.name + 'de tipo ' + pokemon.type; 
}

//http://mongoosejs.com/docs/middleware.html
PokemonSchema.post('findOne',function(pokemon){
	
	console.log(pokemon);
	pokemon.count ++;
	pokemon.save();
	
});

module.exports = mongoose.model('Pokemon', PokemonSchema);











