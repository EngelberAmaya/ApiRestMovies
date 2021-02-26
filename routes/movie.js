var express = require('express');
var app = express();

var Movie = require('../models/movie');

// ==========================================
// Obtener el listado de las peliculas 
// ==========================================

app.get('/', (req, res, next) => {

	Movie.find({})
		 .populate('clasification')
		 .exec(

		 	(err, movies) => {

				if (err) {
					return res.status(500).json({
						ok: false,
						mensaje: 'Error cargando las películas',
						errors: err
					});
				}

				res.status(200).json({
					ok: true,
					movies: movies
				});

			})


});


// ==========================================
// Crear una nueva película 
// ==========================================

app.post('/', (req, res) => {

	var body = req.body;

	var movie = new Movie({
		name: body.name,
		director: body.director,
		clasification: body.clasification
	});

	movie.save( (err, movieSave) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				mensaje: 'Error al crear la película',
				errors: err
			});
		}

		res.status(201).json({
			ok: true,
			movie: movieSave
		});

	});

});


// ==========================================
// Actualizar película 
// ==========================================

app.put('/:id', (req, res) => {

	var id = req.params.id;
	var body = req.body;

	Movie.findById( id, (err, movie) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al buscar la película',
				errors: err
			});
		}

		if (!movie) {
			return res.status(400).json({
				ok: false,
				mensaje: 'La película con el id' + id + 'no existe',
				errors: { message: 'No existe una película con ese ID'}
			});
		}

		movie.name = body.name;
		movie.director = body.director;
		movie.clasification = body.clasification

		movie.save( (err, movieSave) => {

			if (err) {
				return res.status(400).json({
					ok: false,
					mensaje: 'Error al actualizar la película',
					errors: err
				});
			}

			res.status(200).json({
				ok: true,
				movie: movieSave
			});

		});

	});

});


// ==========================================
// Borrar película por el id
// ==========================================

app.delete('/:id', (req, res) => {

	var id = req.params.id;

		Movie.findByIdAndRemove(id, (err, movieDelete) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al borrar una película',
				errors: err
			});
		}

		if (!movieDelete) {
			return res.status(400).json({
				ok: false,
				mensaje: 'No existe una película con ese ID',
				errors: { message: 'No existe una película con ese ID'}
			});
		}

		res.status(200).json({
			ok: true,
			movie: movieDelete
		});

	});

});


module.exports = app;