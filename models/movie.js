var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema({

	name: { type: String, required: [true, 'El nombre de la película es necesaria']},
	director: { type: String, required: [true, 'El director es necesario']},
	clasification: { type:Schema.Types.ObjectId,ref:'Clasification',
					 required: [true, 'El id de la Clasificación es un campo obligatorio']}
	
});


module.exports = mongoose.model('Movie', movieSchema);