import express from 'express';

import routes from './routes';
import { ErrorHandler } from './middleware/ErrorHandler';

const PORT = 3000;

const app = express();

app.use('/api', routes);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))