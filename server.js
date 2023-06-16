const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
require("dotenv").config();
require("./db");

//Rotas
const AuthRouter = require("./routes/Auth");
const AnimalRouter = require("./routes/Animais");

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

app.use('/uploads', express.static(path.resolve(__dirname, "uploads", "especies")))

app.use("/auth", AuthRouter);

app.use("/app", AnimalRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Servidor online rodando na porta ${PORT}`)
})


