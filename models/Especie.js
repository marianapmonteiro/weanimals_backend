const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const especieSchema = new Schema({
	nome: String,
	descricao: String,
	imagens: [String],
	etiquetas: [String],
	racas: [{ type: Schema.Types.ObjectId, ref: "Raca" }],
	category: String,
});

const Especie = mongoose.model("Especie", especieSchema);

module.exports = Especie;
