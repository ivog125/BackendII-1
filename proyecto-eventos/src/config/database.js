import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  if (!config.mongoUrl) {
    console.warn('[database] MONGO_URL no está definida. Se omite la conexión a MongoDB.');
    return;
  }

  try {
    await mongoose.connect(config.mongoUrl);
    console.log('[database] Conectado a MongoDB');
  } catch (error) {
    console.error('[database] Error al conectar a MongoDB:', error.message);
  }
};
