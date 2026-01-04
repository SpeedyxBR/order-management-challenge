import express from 'express';
import { config } from './config';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando!' });
});

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

const startServer = async () => {
  await connectDatabase();
  app.listen(config.port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${config.port}`);
  });
};

startServer();
