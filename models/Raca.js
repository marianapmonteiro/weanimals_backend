const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const racaSchema = new Schema({
	especie: { type: Schema.Types.ObjectId, ref: "Especie" },
	nome: String,
	descricao: String,
	imagens: [String],
	cuidadosEspecificos: String,
	category: String,
	authorName: String,
	authorId: { type: Schema.Types.ObjectId, ref: "User" }
});

const Raca = mongoose.model("Raca", racaSchema);

module.exports = Raca;
