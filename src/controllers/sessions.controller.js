import { registerUser } from '../services/sessions.service.js';

export const getSessions = (req, res) => {
  res.status(200).json({
    status: 'success',
    payload: [],
  });
};

export const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({ status: 'success', payload: newUser });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ status: 'error', message: error.message });
    } else {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};
