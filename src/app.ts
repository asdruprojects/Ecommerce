import express, { Express } from 'express';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { swaggerDocs }  from './config/swagger'
import config from './config/config';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import orderRoutes from './routes/order.route';

const app: Express = express();

// Configuración
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
swaggerDocs(app, config.PORT || 3000)

// Endpoint de prueba
app.get('/ping', (_req, res) => {
    res.json({ message: 'pong' });
});

// Rutas de la API REST
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandlerMiddleware);

export default app;
