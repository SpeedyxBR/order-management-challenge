import express from 'express';
import { config } from './config';
import { connectDatabase } from './config/database';

// Inicializa o Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rota de teste (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando!' });
});

// Função para iniciar o servidor
const startServer = async () => {
  // Conecta ao MongoDB
  await connectDatabase();

  // Inicia o servidor
  app.listen(config.port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${config.port}`);
  });
};

// Inicia a aplicação
startServer();
