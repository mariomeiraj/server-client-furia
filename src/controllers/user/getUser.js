const knex = require('../../connection/sql');

module.exports = async (req, res) => {
	const { id } = req.user;

	try {
		const [user] = await knex('usuarios').where('id', id);

		if (!user) {
			return res.status(404).json('Usuário não encontrado.');
		}

		const { senha: _, ...dataUser } = user;

		return res.json(dataUser);
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
