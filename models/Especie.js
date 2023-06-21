const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const especieSchema = new Schema({
	nome: String,
	descricao: String,
	imagens: [String],
	etiquetas: [String],
	racas: [{ type: Schema.Types.ObjectId, ref: "Raca" }],
	category: String,
	authorName: String,
	authorId: { type: Schema.Types.ObjectId, ref: "User" }
});

const Especie = mongoose.model("Especie", especieSchema);

module.exports = Especie;
