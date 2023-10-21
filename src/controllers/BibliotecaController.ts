import { NextFunction, Request, Response } from "express";
import ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";
import UserService from "../services/UserService";
import LivroService from "../services/LivroService";

export default class BibliotecaController {
    constructor() {}

    async emprestarLivro(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: livroId, cpf } = req.body;

            if (!livroId) {
                throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar o id do livro.');
            }

            if (!cpf) {
                throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar o CPF do usuário.');
            }

            const userService = new UserService();
            const user = await userService.find(cpf);

            if (!user) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Usuário não encontrado.');
            }

            const livroService = new LivroService();
            const livro = await livroService.find(livroId);

            if (!livro) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Livro não encontrado.');
            }

            if (!livro.disponivel) {
                throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Livro não está disponível.');
            }

            livro.disponivel = false;
            livro.userId = user.id;

            const updatedLivro = await livroService.update(livro);

            if (!updatedLivro) {
                throw new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Não foi possível atualizar livro. Tente novamente.');
            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'Livro emprestado com sucesso', updatedLivro);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - emprestarLivro - LivroController - Falha ao emprestar livro', error);
            next(error);  
        }
    }
}