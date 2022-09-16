const express = require('express');
const getUser = require('../controllers/user/getUser');
const login = require('../controllers/user/login');
const register = require('../controllers/user/register');
const deleteUser = require('../controllers/user/deleteUser');
const updateUser = require('../controllers/user/updateUser');
const auth = require('../middlewares/auth');

const routes = express();

routes.post('/logar', login);
routes.post('/cadastrar', register);

routes.use(auth);

routes.get('/token', (req, res) => {
	return res.status(200).send();
});
routes.get('/', getUser);
routes.put('/', updateUser);
routes.delete('/', deleteUser);

module.exports = routes;
