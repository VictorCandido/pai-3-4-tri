import { Book, User } from "@prisma/client";
import prisma from "../lib/prisma";

export default class LivroService {
    constructor() {}

    async findAll() {
        try {
            const livros = await prisma.book.findMany({
                include: {
                    user: true
                }
            });
            
            return livros;
        } catch (error) {
            console.log('[ERROR] - findAll - LivroService - Falha ao consultar livros', error);
            throw error;
        }
    }

    async find(id: string) {
        try {
            const livro = await prisma.book.findUnique({
                where: { id },
                include: { user: true }
            });

            return livro;
        } catch (error) {
            console.log('[ERROR] - find - LivroService - Falha ao consultar livros', error);
            throw error;
        }
    }

    async create(nome: string): Promise<Book> {
        try {
            
            const newLivro = await prisma.book.create({
                data: { nome }
            });

            return newLivro;

        } catch (error) {
            console.log('[ERROR] - create - LivroService - Falha ao criar livro', error);
            throw error; 
        }
    }

    async update({ id, nome, disponivel, userId }: Book): Promise<Book & { user: User | null }> {
        try {
            const updatedLivro = await prisma.book.update({
                where: { id },
                data: {
                    nome,
                    disponivel,
                    userId
                },
                include: { user: true }
            });

            return updatedLivro;
        } catch (error) {
            console.log('[ERROR] - update - LivroService - Falha ao atualizar livro', error);
            throw error; 
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.book.delete({
                where: { id }
            });
        } catch (error) {
            console.log('[ERROR] - delete - LivroService - Falha ao deletar livro', error);
            throw error;
        }
    }
}