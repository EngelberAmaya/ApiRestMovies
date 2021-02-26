var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var clasificationSchema = new Schema({

	name: { type: String, unique: true, required: [true, 'El nombre de la clasificación es necesaria']}

});

clasificationSchema.plugin( uniqueValidator, { message: 'El nombre debe ser único'});

module.exports = mongoose.model('Clasification', clasificationSchema);
