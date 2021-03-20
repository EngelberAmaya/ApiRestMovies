// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

//Puerto para Heroku
const port = process.env.PORT || 3000;

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar rutas
var appRoutes = require('./routes/app');
var clasificationRoutes = require('./routes/clasificacion');
var movieRoutes = require('./routes/movie');


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/moviesDB', (err, res) => {

	if (err) throw err;

	console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});



// Rutas
app.use('/clasification', clasificationRoutes);
app.use('/movie', movieRoutes);
app.use('/', appRoutes);



//Escuchando pelticiones
app.listen(port, () => {
	//console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
	console.log(`Escuchando peticiones en el puerto ${ port }`);
});