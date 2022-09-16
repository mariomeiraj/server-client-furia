const knex = require('../../connection/sql');

module.exports = async (req, res) => {
	const { id } = req.user;

	try {
		const [userDeleted] = await knex('usuarios')
			.where('id', id)
			.del()
			.returning('*');

		if (!userDeleted)
			return res.status(400).json('Não foi possível deletar a conta.');

		return res.json('Conta deletada com sucesso.');
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
