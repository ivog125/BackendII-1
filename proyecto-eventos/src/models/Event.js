import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  nombre: { type: String },
  descripcion: { type: String },
  fecha: { type: Date },
  categoria: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
