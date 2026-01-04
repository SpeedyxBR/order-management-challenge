import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { connectDatabase } from './config/database';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

const startServer = async () => {
  await connectDatabase();
  app.listen(config.port, () => {
    console.log(`🚀 Server running at http://localhost:${config.port}`);
    console.log(`📚 Swagger docs at http://localhost:${config.port}/docs`);
  });
};

startServer();

