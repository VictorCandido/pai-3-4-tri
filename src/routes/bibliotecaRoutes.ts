import express from 'express';
import BibliotecaController from '../controllers/BibliotecaController';


const bibliotecaRoutes = express.Router();

const bibliotecaController = new BibliotecaController();

bibliotecaRoutes.post('/biblioteca/emprestar', bibliotecaController.emprestarLivro);


export default bibliotecaRoutes;