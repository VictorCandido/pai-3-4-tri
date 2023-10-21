import express from 'express';
import LivroController from '../controllers/LivroController';


const livroRoutes = express.Router();

const livroController = new LivroController();

livroRoutes.get('/livros', livroController.findAll);
livroRoutes.get('/livros/:id', livroController.find);
livroRoutes.post('/livros/', livroController.create);
livroRoutes.put('/livros/:id', livroController.update);
livroRoutes.delete('/livros/:id', livroController.delete);

export default livroRoutes;