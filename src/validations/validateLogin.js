const { string } = require('yup');
const yup = require('./config');

const schema = yup.object().shape({
	email: string().email().required(),
	senha: string().required()
});

module.exports = schema;
