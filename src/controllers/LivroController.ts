import { NextFunction, Request, Response } from "express";
import LivroService from "../services/LivroService";
import ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";

class LivroController {
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const livroService = new LivroService();
    
            const livros = await livroService.findAll();
    
            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', livros);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - findAll - LivroController - Falha ao consultar livros', error);
            next(error);
        }
    }

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const livroService = new LivroService();
            const livro = await livroService.find(id);

            if (!livro) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Livro não encontrado', id);
            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', livro);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - find - LivroController - Falha ao consultar livros', error);
            next(error);
        }
    }
}

export default LivroController;