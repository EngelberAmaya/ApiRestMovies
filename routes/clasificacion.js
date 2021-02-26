var express = require('express');
var app = express();

var Clasification = require('../models/clasification');

// ==========================================
// Obtener el listado de clasificación 
// ==========================================

app.get('/', (req, res, next) => {

	Clasification.find({}, (err, clasifications) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error cargando la clasificación',
				errors: err
			});
		}

		res.status(200).json({
			ok: true,
			clasifications: clasifications
		});

	})

});


// ==========================================
// Crear una nueva clasificación 
// ==========================================

app.post('/', (req, res) => {

	var body = req.body;

	var clasification = new Clasification({
		name: body.name
	});

	clasification.save( (err, clasificationSave) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				mensaje: 'Error al crear la clasificación',
				errors: err
			});
		}

		res.status(201).json({
			ok: true,
			clasification: clasificationSave
		});

	});

});


// ==========================================
// Actualizar clasificación 
// ==========================================

app.put('/:id', (req, res) => {

	var id = req.params.id;
	var body = req.body;

	Clasification.findById( id, (err, clasification) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al buscar una clasificación',
				errors: err
			});
		}

		if (!clasification) {
			return res.status(400).json({
				ok: false,
				mensaje: 'La clasificación con el id' + id + 'no existe',
				errors: { message: 'No existe un usuario con ese ID'}
			});
		}

		clasification.name = body.name;

		clasification.save( (err, clasificationSave) => {

			if (err) {
				return res.status(400).json({
					ok: false,
					mensaje: 'Error al actualizar una clasificación',
					errors: err
				});
			}

			res.status(200).json({
				ok: true,
				clasification: clasificationSave
			});

		});

	});

});


// ==========================================
// Borrar clasificación por el id
// ==========================================

app.delete('/:id', (req, res) => {

	var id = req.params.id;

	Clasification.findByIdAndRemove(id, (err, clasificationDelete) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al borrar una clasificación',
				errors: err
			});
		}

		if (!clasificationDelete) {
			return res.status(400).json({
				ok: false,
				mensaje: 'No existe una clasificación con ese ID',
				errors: { message: 'No existe una clasificación con ese ID'}
			});
		}

		res.status(200).json({
			ok: true,
			clasification: clasificationDelete
		});

	});

});


module.exports = app;