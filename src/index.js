require('dotenv').config();
const express = require('express');
const cors = require('cors');
const user = require('./routes/user');
const guild = require('./routes/guild');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/usuario', user);
app.use('/torcida', guild);

app.listen(process.env.PORT, () => {
	console.log(`🏃 - Server running on port: ${process.env.PORT}.`);
});
