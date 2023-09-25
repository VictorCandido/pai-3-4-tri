import express from 'express';

import LivroController from './controllers/LivroController';

const routes = express.Router();

const livroController = new LivroController();

routes.get('/livros', livroController.findAll);
routes.get('/livros/:id', livroController.find);



routes.get('/hello', (req, res) => {
    res.send('hello world');
});

export default routes;