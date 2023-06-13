const express = require("express");
const app = express();

const mongoose = require("mongoose");

const AuthRouter = require("./routes/Auth");
const AnimalRouter = require("./routes/Animais");

const cors = require("cors");

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});
app.use(cors());
app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 3001;
mongoose
	.connect(process.env.DB)
	.then(() => {
		console.log("Conectado ao banco de dados ");
		app.listen(PORT, () => {
			console.log(`Servidor online! Rodando na porta ${PORT}`);
		});
	})
	.catch();

app.use("/auth", AuthRouter);

app.use("/app", AnimalRouter);
