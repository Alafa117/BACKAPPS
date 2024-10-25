import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta de registro
router.post('/signup', registerUser); // Llama a registerUser para manejar el registro

// Ruta de login
router.post('/login', loginUser); // Llama a loginUser para manejar el inicio de sesión

export default router;