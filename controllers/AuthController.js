const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.json({ error: "Senhas não conferem." });
	}
	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.json({ error: "E-mail já cadastrado." })
		} else {
			console.log('criando usuario')
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
							error: "Ocorreu um erro ao se registrar.",
						});
					});
			});
		}
	} catch (err) {
		console.log(err);

	}


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
						const userData = {
							name: user.name,
							email: user.email,
						};

						res.json({ message: "Login efetuado com sucesso!", token, data: userData });
					} else {
						res.json({ error: "Senha inválida." });
					}
				}
			});
		} else {
			res.json({
				error: "Nenhum usuário encontrado.",
			});
		}
	});
};

module.exports = { register, login };
