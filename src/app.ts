import express, { Express } from 'express';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import orderRoutes from './routes/order.route';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => {
    res.json({ message: 'pong' });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandlerMiddleware);

export default app;
