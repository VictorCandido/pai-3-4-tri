import express from 'express';

import { ErrorHandler } from './middleware/ErrorHandler';
import livroRoutes from './routes/livroRoutes';
import bibliotecaRoutes from './routes/bibliotecaRoutes';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api', livroRoutes);
app.use('/api', bibliotecaRoutes);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))