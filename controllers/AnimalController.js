const Especie = require("../models/Especie");
const Raca = require("../models/Raca");
const path = require('path');

const addEspecie = (req, res, next) => {
	console.log('req:', req.body)
	if (!req.files || req.files.length === 0) {
		return res.status(400).json({ error: "É necessário o envio de imagens!" });
	}

	Especie.findOne({ nome: req.body.nome }).then((especie) => {
		if (especie) {
			res.json({ error: "Espécie já cadastrada" });
		} else {
			const imagePaths = req.files.map((file) => path.basename(file.path));

			const especie = new Especie({
				nome: req.body.nome,
				descricao: req.body.descricao,
				imagens: imagePaths,
				etiquetas: req.body.etiquetas,
				category: req.body.category,
				authorName: req.body.author
			});

			especie
				.save()
				.then((especie) => {
					res.json({
						message: "Espécie adicionada com sucesso!",
					});
				})
				.catch((error) => {
					console.log(error)
					res.json({
						error: "Ocorreu um erro ao adicionar a espécie.",
					});
				});
		}
	})

};

const addRaca = (req, res, next) => {
	const raca = new Raca({
		especie: req.body.especie,
		nome: req.body.nome,
		descricao: req.body.descricao,
		imagens: req.body.imagens,
		cuidadosEspecificos: req.body.cuidadosEspecificos,
		category: req.body.category,
		authorName: req.body.author
	});

	raca
		.save()
		.then((raca) => {
			res.json({
				message: "Raça adicionada com sucesso!",
			});
		})
		.catch((error) => {
			res.json({
				message: "Ocorreu um erro ao adicionar a raça.",
			});
		});
};
const getEspecies = (req, res, next) => {
	Especie.find()
		.then((especies) => {
			res.json(especies);
		})
		.catch((error) => {
			res.json({
				message: "Ocorreu um erro ao obter as espécies.",
				error: error,
			});
		});
};

const getRacas = (req, res, next) => {
	Raca.find()
		.then((racas) => {
			res.json(racas);
		})
		.catch((error) => {
			res.json({
				message: "Ocorreu um erro ao obter as raças.",
				error: error,
			});
		});
};

module.exports = { addEspecie, addRaca, getEspecies, getRacas };
