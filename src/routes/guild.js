const express = require('express');
const uploadLogo = require('../controllers/guild/uploadLogo');
const auth = require('../middlewares/auth');

const routes = express();

routes.use(auth);

routes.post('/upload_logo', uploadLogo);

module.exports = routes;
