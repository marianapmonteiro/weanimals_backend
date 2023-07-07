const Comunidade = require("../models/Comunidade");
const Especie = require("../models/Especie");
const Raca = require("../models/Raca");
const path = require('path');


const pareamentoPet = async (req, res, next) => {
	const respostas = req.body.respostas;
	console.log("chamando a funcao!!!", req.body.respostas)
	console.log("respostas back:", req.body.respostas)
	const especies = await Especie.find(); // Supondo que Especie.find() retorna um array de objetos das espécies

	console.log("especies back", especies)

	const especiesCompativeis = especies.filter((especie) => {
		// Verificar se as etiquetas da espécie têm pelo menos um valor em comum com as respostas
		const etiquetasComuns = especie.etiquetas.filter((etiqueta) =>
			respostas.includes(etiqueta)
		);
		return etiquetasComuns.length > 3; // Retornar apenas espécies com etiquetas em comum
	});
	if (especiesCompativeis.length === 0) {
		return res.json({
			message: "Não foram encontradas espécies compatíveis.",
		});
	}
	return res.json({ message: especiesCompativeis })
};

const addEspecie = (req, res, next) => {
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
				authorName: req.body.author,
				authorId: req.user.userId
			});
			if (req.body.comunidades) {
				const comunidades = JSON.parse(req.body.comunidades);
				comunidades.forEach((item) => {
					const comunidade = new Comunidade({
						nome: item.nome,
						redeSocial: item.redeSocial,
						link: item.link,
						especieId: especie._id,
					})
					comunidade.save(); ''
				})
			}

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
	if (!req.files || req.files.length === 0) {
		return res.status(400).json({ error: "É necessário o envio de imagens!" });
	}
	Raca.findOne({ nome: req.body.nome }).then((raca) => {
		if (raca) {
			res.json({ error: "Raça já cadastrada" });
		}
		else {
			const imagePaths = req.files.map((file) => path.basename(file.path));
			const raca = new Raca({
				especie: req.body.especie,
				nome: req.body.nome,
				descricao: req.body.descricao,
				imagens: imagePaths,
				cuidadosEspecificos: req.body.cuidadosEspecificos,
				category: req.body.category,
				authorName: req.body.author,
				authorId: req.user.userId
			});
			raca
				.save()
				.then((raca) => {
					res.json({
						message: "Raça adicionada com sucesso!",
					});
				}).catch((error) => {
					res.json({
						error: "Ocorreu um erro ao adicionar a raça.",
					});
				});
		}
	})

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

const getEspeciesByAuthorId = (req, res, next) => {
	Especie.find({ authorId: req.user.userId })
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

const getRacasByAuthorId = (req, res, next) => {
	Raca.find({ authorId: req.user.userId })
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

const getComunidades = (req, res, next) => {
	Comunidade.find({ especieId: req.query.especieId })
		.then((comunidades) => {
			res.json(comunidades);
		})
		.catch((error) => {
			res.json({
				message: "Ocorreu um erro ao obter as comunidades.",
				error: error,
			});
		});
};



module.exports = { pareamentoPet, addEspecie, addRaca, getEspecies, getRacas, getEspeciesByAuthorId, getRacasByAuthorId, getComunidades };
