const repeatedEmailNick = require('../../utils/repeatedEmailNick');
const validateUpdateUser = require('../../validations/validateUpdateUser');
const knex = require('../../connection/sql');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	const { nome, nick, email, nova_senha, torcida, estado, jogador_favorito } =
		req.body;
	const { id } = req.user;

	if (
		!nome &&
		!nick &&
		!email &&
		!nova_senha &&
		!torcida &&
		!estado &&
		!jogador_favorito
	) {
		return res.status(400).json({
			mensagem: 'Você precisa inserir pelo menos um campo para atualizar.'
		});
	}

	try {
		await validateUpdateUser.validate(req.body);

		if (email || nick) {
			const emailOrNickInUse = await repeatedEmailNick(id, email, nick);

			if (emailOrNickInUse) return res.status(400).json(emailOrNickInUse);
		}

		if (nova_senha) {
			const passwordEncrypted = await bcrypt.hash(nova_senha, 12);
			let { nova_senha: _, ...bodyForSend } = req.body;

			bodyForSend.senha = passwordEncrypted;

			const [userUpdated] = await knex('usuarios')
				.update(bodyForSend)
				.where('id', id)
				.returning('*');

			if (!userUpdated) {
				return res.status(400).json('Não foi possível atualizar no momento.');
			}

			return res.json('Atualizado com sucesso.');
		}

		const [userUpdated] = await knex('usuarios')
			.update(req.body)
			.where('id', id)
			.returning('*');

		if (!userUpdated) {
			return res.status(400).json('Não foi possível atualizar no momento.');
		}

		return res.json('Atualizado com sucesso.');
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
