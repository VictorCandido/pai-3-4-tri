# Projeto Biblioteca - Pai 3º Trimestre (FSW)

Tarefas para completar o projeto

- [x] Instalar Node.JS
- [x] Iniciar projeto Node.JS usando NPM
  - [x] `npm init -y`
- [x] Instalar o Typescript-D
  - [x] `npm i typescript @types/node tsx `
- [x] Configurar o Typescript
  - [x] `npx tsc --init`
  - [x] Editar `"target": "ES2020"` dentro do arquivo `tsconfig.json`
  - [x] Adicionar `"start": "tsx watch src/index.ts"` dentro do `package.json` para iniciar o serviço sem precisar de nodemon
- [x] Construir o primeiro servidor
- [x] Construir a primeira rota
- [x] Construir middleware de rotas
- [x] Implementar LivroController
- [x] Criar instância do banco no Planetscale
- [x] Instalar e configurar Prisma
- [x] Implementar LivroService
- [x] Implementar modelos de respostas
- [x] Implementar Error Handler
- [x] Finalizar LivroController e LivroService
- [ ] Implementar UserController
- [x] Implementar UserService
- [x] Separar rotas de livros, usuários e biblioteca
- [x] Construir regra para emprestar livro
- [x] Revisar conteúdo da última aula
- [x] Implementar FluigService
- [x] Construir startProcess do Fluig
- [x] Implementar segurança com JWT
- [ ] Fazer deploy
  - [x] https://render.com/
  - [x] Novo Web service
  - [ ] Build from Git Repository
  - [ ] Build Command `npm ci && npm run build && npx prisma migrate deploy`
  - [ ] Start Command `npm run start`
  - [ ] Adicionar Environment Variables