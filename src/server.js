import app from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/config.js';

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port} (${config.nodeEnv})`);
  });
};

startServer();
