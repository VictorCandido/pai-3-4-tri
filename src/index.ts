import express from 'express';

import { ErrorHandler } from './middleware/ErrorHandler';
import livroRoutes from './routes/livroRoutes';
import bibliotecaRoutes from './routes/bibliotecaRoutes';
import authRoutes from './routes/authRoutes';
import AuthMiddleware from './middleware/AuthMiddleware';

const PORT = 3000;

const app = express();

app.use(express.json());

const authMiddleware = new AuthMiddleware();

app.use('/api', authRoutes);

app.use('/api', authMiddleware.checkAuthorization);

app.use('/api', livroRoutes);
app.use('/api', bibliotecaRoutes);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));