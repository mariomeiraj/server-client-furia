const knex = require('../connection/sql');

module.exports = async (id, email, nick) => {
	try {
		if (email) {
			const [user] = await knex('usuarios').where('email', email);

			if (user && user.id !== id) {
				return 'Email em uso.';
			}
		}

		if (nick) {
			const [user] = await knex('usuarios').where('nick', nick);

			if (user && user.id !== id) {
				return 'Nickname em uso.';
			}
		}
	} catch (error) {
		return error.message;
	}
};
