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
}