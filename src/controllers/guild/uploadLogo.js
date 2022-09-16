const supabase = require('../../connection/supabase');

module.exports = async (req, res) => {
	const { nome, imagem } = req.body;

	const buffer = Buffer.from(imagem, 'base64');

	try {
		const img = await supabase.storage
			.from(process.env.STORAGE_BUCKET)
			.upload(nome, buffer);

		return res.json(img);
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
