const Especie = require("../models/Especie");
const Raca = require("../models/Raca");

const addEspecie = (req, res, next) => {
	const especie = new Especie({
		nome: req.body.nome,
		descricao: req.body.descricao,
		imagens: req.body.imagens,
		etiquetas: req.body.etiquetas,
		category: req.body.category,
	});

	especie
		.save()
		.then((especie) => {
			res.json({
				message: "Espécie adicionada com sucesso!",
			});
		})
		.catch((error) => {
			res.json({
				message: "Ocorreu um erro ao adicionar a espécie.",
			});
		});
};

const addRaca = (req, res, next) => {
	const raca = new Raca({
		especie: req.body.especie,
		nome: req.body.nome,
		descricao: req.body.descricao,
		imagens: req.body.imagens,
		cuidadosEspecificos: req.body.cuidadosEspecificos,
		category: req.body.category,
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
