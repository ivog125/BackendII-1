import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String },
  email: { type: String },
  password: { type: String },
  rol: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
