import express from 'express';
import cors from 'cors';
import {env} from './config/env';
import authRoutes from './routes/auth.routes';
import scoreRoutes from './routes/score.routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(scoreRoutes);

app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({message: 'API de consulta de riesgo financiero'});
});

app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({error: 'Ruta no encontrada'});
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({error: 'Error interno del servidor'});
});

app.listen(env.port, () => {
    console.log(`Servidor escuchando en http://localhost:${env.port}`);
});

