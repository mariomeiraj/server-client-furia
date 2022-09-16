const bcrypt = require('bcrypt');
const knex = require('../../connection/sql');
const jwt = require('jsonwebtoken');
const validateLogin = require('../../validations/validateLogin');

module.exports = async (req, res) => {
	const { email, senha } = req.body;

	try {
		await validateLogin.validate(req.body);

		const [user] = await knex('usuarios').where('email', email);

		if (!user) return res.status(401).json('Email ou senha incorreto.');

		const confirmPassword = await bcrypt.compare(senha, user.senha);

		if (!confirmPassword) {
			return res.status(401).json('Email ou senha incorreto.');
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: 604800
		});

		return res.json({ token });
	} catch (error) {
		return res.status(400).json({ mensagem: error.message });
	}
};
