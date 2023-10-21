import { User } from "@prisma/client";
import prisma from "../lib/prisma";

export default class UserService {
    constructor() {}

    async find(cpf: string): Promise<User | null> {
        try {
            
            const user = await prisma.user.findUnique({
                where: { cpf }
            });

            return user;
        } catch (error) {
            console.log('[ERROR] - find - UserService - Falha ao procurar usuário', error);
            throw error; 
        }
    }
}