const { string } = require('yup');
const yup = require('./config');

const schema = yup.object().shape({
	nome: string().min(4).max(25),
	nick: string().min(3).max(20),
	email: string().email(),
	nova_senha: string().min(8),
	torcida: string(),
	estado: string().max(2),
	jogador_favorito: string()
});

module.exports = schema;
