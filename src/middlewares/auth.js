const jwt = require('jsonwebtoken');
const knex = require('../connection/sql');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json('O Token não foi informado.');
	}

	const token = authorization.replace('Bearer', '').trim();

	try {
		const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

		req.user = verifyUser;

		const [user] = await knex('usuarios').where('id', verifyUser.id);

		if (!user) {
			return res.status(401).json('Token inválido.');
		}

		return next();
	} catch (error) {
		return res.status(401).json('Token inválido.');
	}
};
