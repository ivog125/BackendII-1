import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/config.js';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} (${config.nodeEnv})`);
  });
};

startServer();
