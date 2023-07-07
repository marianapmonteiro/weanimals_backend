const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comunidadeSchema = new Schema({
    nome: String,
    redeSocial: String,
    link: String,
    especieId: [{ type: Schema.Types.ObjectId, ref: "Especie" }],
});

const Comunidade = mongoose.model("Comunidade", comunidadeSchema);

module.exports = Comunidade;
