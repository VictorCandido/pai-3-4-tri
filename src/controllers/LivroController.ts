import { NextFunction, Request, Response } from "express";
import LivroService from "../services/LivroService";
import ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";
import { LivroProps } from "../interfaces/LivroProps";

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

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const { nome } = req.body;

            if (!nome) {
                throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar o nome do livro.');
            }

            const livroService = new LivroService();

            const newLivro = await livroService.create(nome);

            if (!newLivro) {
                throw new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Não foi possível criar o livro. Tente novamente.');
            }

            const response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Livro criado com sucesso.', newLivro);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - create - LivroController - Falha ao criar livro', error);
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const { nome, userId, disponivel }: LivroProps = req.body;
            const { id } = req.params;

            if (!nome) {
                throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar o nome do livro.');
            }
            
            const livroService = new LivroService();
            
            const livro = await livroService.find(id);

            if (!livro) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Não foi possível encontrar o livro informado.');
            }

            livro.nome = nome;
            livro.userId = userId;
            livro.disponivel = disponivel;

            const updatedLivro = await livroService.update(livro);

            if (!updatedLivro) {
                throw new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Não foi possível atualizar o livro. Tente novamente.');
            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'Livro atualizado com sucesso.', updatedLivro);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - update - LivroController - Falha ao atualizar livro', error);
            next(error);  
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const livroService = new LivroService();
            
            const livro = await livroService.find(id);

            if (!livro) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Não foi possível encontrar o livro informado.');
            }

            await livroService.delete(id);

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'Livro deletado com sucesso.');
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - delete - LivroController - Falha ao deletar livro', error);
            next(error);  
        }
    }
}

export default LivroController;