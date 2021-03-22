// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('./config/config')

// Inicializar variables
var app = express();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar rutas
var appRoutes = require('./routes/app');
var clasificationRoutes = require('./routes/clasificacion');
var movieRoutes = require('./routes/movie');


// Conexión a la base de datos
mongoose.connection.openUri(process.env.URLDB, (err, res) => {

	if (err) throw err;

	console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});



// Rutas
app.use('/clasification', clasificationRoutes);
app.use('/movie', movieRoutes);
app.use('/', appRoutes);



//Escuchando pelticiones
app.listen(process.env.PORT, () => {
	//console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
	console.log(`Escuchando peticiones en el puerto ${ process.env.PORT }`);
});