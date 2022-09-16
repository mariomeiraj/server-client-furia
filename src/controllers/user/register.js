const knex = require('../../connection/sql');
const validateRegister = require('../../validations/validateRegister');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	const { nome, nick, email, senha } = req.body;

	try {
		await validateRegister.validate(req.body);

		const [emailOrNickInUse] = await knex('usuarios')
			.where('email', email)
			.orWhere('nick', nick)
			.returning('*');

		if (emailOrNickInUse) return res.status(400).json('Email ou Nick em uso.');

		const passwordEncrypted = await bcrypt.hash(senha, 12);

		const [userRegistered] = await knex('usuarios')
			.insert({
				nome,
				nick,
				email,
				senha: passwordEncrypted
			})
			.returning('*');

		if (!userRegistered) {
			return res
				.status(400)
				.json('Não foi possível fazer o cadastro no momento.');
		}

		return res.status(201).json('Cadastrado(a) com sucesso.');
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
