const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Senhas não conferem." });
	}

	bcrypt.hash(password, 10, function (err, hashedPass) {
		if (err) {
			res.json({
				error: err,
			});
		}
		let user = new User({
			name: name,
			email: email,
			password: hashedPass,
		});
		user
			.save()
			.then((user) => {
				res.json({
					message: "Usuário criado com sucesso!",
				});
			})
			.catch((error) => {
				res.json({
					message: "Ocorreu um erro ao se registrar.",
				});
			});
	});
};
const login = (req, res, next) => {
	const { email, password } = req.body;

	User.findOne({ $or: [{ email: email }] }).then((user) => {
		if (user) {
			bcrypt.compare(password, user.password, function (err, result) {
				if (err) {
					res.json({
						error: err,
					});
				} else {
					if (result) {
						let token = jwt.sign({ name: user.name }, "verySecretValue", {
							expiresIn: "24h",
						});
						res.json({ message: "Login efetuado com sucesso!", token });
					} else {
						res.json({ message: "Senha inválida." });
					}
				}
			});
		} else {
			res.json({
				message: "Nenhum usuário encontrado.",
			});
		}
	});
};

module.exports = { register, login };
