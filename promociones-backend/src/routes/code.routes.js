import express from 'express';
import { verifyCode } from '../controllers/code.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Ruta de verificación de códigos
router.post('/verify', protect, verifyCode); // Llama a verifyCode y protege la ruta con middleware de autenticación

export default router;