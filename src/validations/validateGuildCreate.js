const { string } = require('yup');
const yup = require('./config');

const schema = yup.object().shape({
	nome_torcida: string().required().min(3).max(30),
	tag_torcida: string().required().min(2).max(5),
	descricao_torcida: string()
});

module.exports = schema;
